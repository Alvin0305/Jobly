// check the ../models/post.js and ../routes/postRoutes.js file for the name of parameters required

export const createPost = async (req, res) => {
  // use create post function in the post model to create a post
};

export const getPostById = async (req, res) => {
  // use the get post by id function in the post model to get the complete details of a post
  // use the get comments function in the comment model to get the comments also
};

export const deletePost = async (req, res) => {
  // use the delete post function in the post model to delete a post
};

export const getPostsByUser = async (req, res) => {
  // use the get posts by user function in the post model to get all the posts created by the user
};

export const getComments = async (req, res) => {
  // use the get comments function in the comment model to get the comments for the given post
};

export const getPostsInFeed = async (req, res) => {
  // use the get posts in feed function in the post model to generate the feed for the given user
};

export const searchPosts = async (req, res) => {
  // use the search posts function in the post model to get the posts based on the search
};