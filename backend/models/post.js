import pool from "../db.js";

export const createPostFunction = async (
  user_id,
  blog,
  description,
  image_urls = [],
  domain_tags = [],
  user_tags = []
) => {
  const client = await pool.connect();
  // insert the post into the posts table
  try {
    await client.query("BEGIN");

    const postResult = await client.query(
      `INSERT INTO posts (user_id, blog, description) VALUES ($1, $2, $3) RETURNING id`,
      [user_id, blog, description]
    );
    // add the post_id and image_url into the post image table
    const post_id = postResult.rows[0].id;

    for (const url of image_urls) {
      await client.query(
        `INSERT INTO post_images (post_id, image_url) VALUES ($1, $2)`,
        [post_id, url]
      );
    }

    // add the domain tags to the domain tags table
    for (const domain of domain_tags) {
      await client.query(
        `INSERT INTO post_domains (post_id, domain_id) VALUES ($1, $2)`,
        [post_id, domain]
      );
    }
    // add the user tags to the tags table
    for (const user of user_tags) {
      await client.query(`insert into tags (post_id,user_id) values($1,$2)`, [
        post_id,
        user,
      ]);
    }
    await client.query("COMMIT");

    return { post_id, message: "Post created successfully" };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const getPostsInFeedFunction = async (
  user_id,
  limit = 10,
  offset = 0
) => {
  try {
    const result = await pool.query(
      `
      SELECT DISTINCT ON (p.id) 
        p.*, 
        u.firstname, 
        u.lastname, 
        u.image,
        COALESCE(images.image_urls, ARRAY[]::text[]) AS image_urls,

        -- Count of likes for each post
        COALESCE(like_counts.total_likes, 0) AS like_count,

        -- Whether the user has liked the post
        CASE WHEN user_likes.liked_by IS NOT NULL THEN true ELSE false END AS liked_by_user

      FROM posts p
      JOIN users u ON p.user_id = u.id

      -- Join post_images and aggregate URLs
      LEFT JOIN (
        SELECT post_id, array_agg(image_url) AS image_urls
        FROM post_images
        GROUP BY post_id
      ) AS images ON images.post_id = p.id

      -- Likes count per post
      LEFT JOIN (
        SELECT post_id, COUNT(*) AS total_likes
        FROM post_likes
        GROUP BY post_id
      ) AS like_counts ON like_counts.post_id = p.id

      -- Whether the user has liked the post
      LEFT JOIN (
        SELECT post_id, liked_by
        FROM post_likes
        WHERE liked_by = $1
      ) AS user_likes ON user_likes.post_id = p.id

      -- Followed users
      LEFT JOIN requests r 
        ON ((r.requestor_id = $1 AND r.acceptor_id = p.user_id)
         OR (r.acceptor_id = $1 AND r.requestor_id = p.user_id))
        AND r.status = 'Accepted'

      -- Domain-based interest
      LEFT JOIN post_domains pd ON p.id = pd.post_id
      LEFT JOIN user_interests ui ON pd.domain_id = ui.interest_id AND ui.user_id = $1

      -- Show post if from followed user OR matching interest
      WHERE r.id IS NOT NULL OR ui.user_id IS NOT NULL

      ORDER BY p.id, p.time DESC
      LIMIT $2 OFFSET $3
      `,
      [user_id, limit, offset]
    );

    return result.rows;
  } catch (err) {
    console.error("Error generating feed:", err);
    throw err;
  }
};

export const getPostByIdFunction = async (post_id) => {
  // get   the post details, comment, likes with given post id
  try {
    // 1. Get post details
    const postResult = await pool.query(
      ` SELECT 
      p.id,
      p.blog,
      p.description,
      COALESCE(json_agg(pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL), '[]') AS image_urls
    FROM posts p
    LEFT JOIN post_images pi ON p.id = pi.post_id
    WHERE p.id = $1
    GROUP BY p.id;`,
      [post_id]
    );
    if (postResult.rows.length === 0) {
      return null; // no post found
    }
    const post = postResult.rows[0];

    // 2. Get comments for the post
    const commentsResult = await pool.query(
      `SELECT c.id, c.user_id, c.content, c.time,
              u.firstname, u.lastname, u.image
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.post_id = $1
       ORDER BY c.time DESC`,
      [post_id]
    );

    // 3. Get likes count for the post
    const likesResult = await pool.query(
      `SELECT COUNT(*) AS likes_count FROM post_likes WHERE post_id = $1`,
      [post_id]
    );

    return {
      ...post,
      comments: commentsResult.rows,
      likes_count: parseInt(likesResult.rows[0].likes_count, 10),
    };
  } catch (error) {
    console.error("Error fetching post by id:", error);
    throw error;
  }
};

export const deletePostFunction = async (post_id) => {
  // delete the post from the posts table
  try {
    const result = await pool.query(`delete from posts where id = $1`, [
      post_id,
    ]);
    return result;
  } catch (err) {
    console.log("Error deleting posts:", err);
    throw err;
  }
};

export const getPostsByUserFunction = async (user_id) => {
  // get all the posts created by the user
  try {
    const result = await pool.query(
      `SELECT 
      p.id AS post_id,
      p.blog,
      p.description,
      p.time,
      pi.id AS image_id,
      pi.image_url,
      pi.uploaded_at
    FROM posts p
    LEFT JOIN post_images pi ON p.id = pi.post_id
    WHERE p.user_id = $1
    ORDER BY p.time DESC`,
      [user_id]
    );
    return result.rows;
  } catch (err) {
    console.log("Error fetching posts");
    throw err;
  }
};

export const searchPostFunction = async (
  domain_name,
  limit = 10,
  offset = 0
) => {
  try {
    const result = await pool.query(
      `select p.*
       from posts p
       join post_domains pd on p.id = pd.post_id
       join domains d on d.id = pd.domain_id
       where d.name = $1
       limit $2 offset $3 
      `,
      [domain_name, limit, offset]
    );
    return result.rows;
  } catch (err) {
    console.error("Error filtering post by domain", err);
    throw err;
  }
};
