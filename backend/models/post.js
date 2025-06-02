export const createPostFunction = async (
  user_id,
  blog,
  description,
  image_urls,
  domain_tags,
  user_tags
) => {
  // insert the post into the posts table
  // add the post_id and image_url into the post image table
  // add the domain tags to the domain tags table
  // add the user tags to the tags table
};

export const getPostsInFeedFunction = async (user_id) => {
  // get all the posts, posts viewed by users, and generate a feed for the user
};

export const searchPostsFunction = async (searchValue, tags) => {
  // get all posts based on the searchValue and the tags
};

export const getPostByIdFunction = async (post_id) => {
  // get the post details, comment, likes with given post id
};

export const deletePostFunction = async (post_id) => {
  // delete the post from the posts table
};

export const getPostsByUserFunction = async (user_id) => {
  // get all the posts created by the user
};
