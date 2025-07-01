// check the ../models/post.js and ../routes/postRoutes.js file for the name of parameters required
import {
  createPostFunction,
  getPostByIdFunction,
  deletePostFunction,
  getPostsByUserFunction,
  getPostsInFeedFunction,
  searchPostFunction,
} from "../models/post.js";
import { addCommentFunction, getCommentsFunction } from "../models/comment.js";

export const createPost = async (req, res) => {
  try {
    const user_id = req.user?.id; // assuming req.user is set by JWT middleware
    if (!user_id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: user_id missing from token" });
    }

    const { blog, description, image_urls, domain_tags, user_tags } = req.body;

    const savedPost = await createPostFunction(
      user_id,
      blog,
      description,
      image_urls,
      domain_tags,
      user_tags
    );

    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPostById = async (req, res) => {
  // use the get post by id function in the post model to get the complete details of a post
  // use the get comments function in the comment model to get the comments also
  try {
    const post_id = parseInt(req.params.id, 10);
    if (isNaN(post_id)) {
      return res.status(400).json({ error: "post_id required" });
    }
    const postDetails = await getPostByIdFunction(post_id);
    if (!postDetails) return res.status(404).json({ error: "Post not found" });

    res.status(200).json(postDetails);
  } catch (err) {
    console.error("Error fetching post by id:", err);
    res.status(500).json({ error: "Internal servr error" });
  }
};

export const deletePost = async (req, res) => {
  // use the delete post function in the post model to delete a post
  try {
    const post_id = parseInt(req.params.id, 10);
    if (isNaN(post_id))
      return res.status(400).json({ error: "post_id requieed" });
    const postDetails = await deletePostFunction(post_id);
    if (!postDetails) return res.status(404).json({ error: "Post not found" });
    res.status(200).json({ messsage: "Post delete successully" });
  } catch (err) {
    console.log("Error fetching details");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPostsByUser = async (req, res) => {
  // use the get posts by user function in the post model to get all the posts created by the user
  try {
    const user_id = parseInt(req.params.id, 10);
    if (isNaN(user_id))
      return res.status(400).json({ error: "Userid invalid" });
    const posts = await getPostsByUserFunction(user_id);
    return res.status(200).json(posts);
  } catch (err) {
    console.log("Error fetching post");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getComments = async (req, res) => {
  // use the get comments function in the comment model to get the comments for the given post
  try {
    const post_id = parseInt(req.params.id, 10);
    if (isNaN(post_id))
      return res.status(400).json({ error: "Invalid post_id" });
    const comments = await getCommentsFunction(post_id);
    return res.status(200).json(comments);
  } catch (err) {
    console.log("Error fetching details");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  const user_id = req.user.id;
  const { comment } = req.body;
  const post_id = req.params.id;
  try {
    const newComment = await addCommentFunction(post_id, user_id, comment);
    if (!newComment)
      return res.status(400).json({ error: "failed to add comment" });
    return res.status(200).json(newComment);
  } catch (err) {
    console.log("Error adding comment");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPostsInFeed = async (req, res) => {
  // use the get posts in feed function in the post model to generate the feed for the given user
  const { offset, limit } = req.query;
  console.log("here");
  try {
    const user_id = parseInt(req.params.id, 10);
    if (isNaN(user_id)) return res.status(400).json({ error: "Invalid user" });
    const posts = await getPostsInFeedFunction(user_id, limit, offset);
    return res.status(200).json(posts);
  } catch (err) {
    console.log("Error fetching details");
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchPost = async (req, res) => {
  const { limit, offset } = req.query;
  try {
    const domain_name = req.query.domain;
    if (!domain_name)
      return res.status(400).json({ error: "Domain name required" });
    const posts = await searchPostFunction(domain_name, limit, offset);
    return res.status(200).json(posts);
  } catch (err) {
    console.error("Error searching posts by domain", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
