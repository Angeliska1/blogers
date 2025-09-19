import Post from "../models/postModel.js";

//create a new blog post
export const createPost = async (req, res) => {
  try {
    const { title, author, body, excerpt } = req.body;

    // Create a new post
    const newPost = await Post.create({ title, author, body, excerpt });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
      populatedPost: await newPost.populate("author"),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//get all blog posts
export const getPosts = async (req, res, next) => {
  try {
    res.status(200).json({
      paginatedData: res.locals.paginatedResults,
    })
  } catch (error) {
    next(error);
  };
};

//get a single blog post by id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res
      .status(404)
      .json({ success: false, message: "Post not found" });
    };
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  };
};

//update a blog post by id
export const updatePost = async (req, res) => {
  try {
    const { title, author, body, excerpt } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, author, body, excerpt },
      { new: true}
    );
    if (!updatedPost) {
      return res
      .status(404)
      .json({ success: false, message: "Post not found" });
    };
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  };
};

//delete a blog post by id
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res
      .status(404)
      .json({ success: false, message: "Post not found" });
    };
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  };
};

export default { createPost, getPosts, getPostById, updatePost, deletePost };

