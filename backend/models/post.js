export const createPostFunction = async (
  user_id,
  blog,
  description,
  image_urls
) => {
  // insert the post into the posts table
  // add the post_id  and image_url into the post image table
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

export const likePostFunction = async (user_id, post_id) => {
  // insert the post_id and user_id into the post like table
};
