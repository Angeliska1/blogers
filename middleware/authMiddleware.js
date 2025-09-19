import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { request } from "express";

//check if a user is loged in or not
export const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if(token){
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select("-password");

      next();

    } catch(error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
      next(error);
    }
  }else{
    res.status(401);
    throw new Error("Not authorized, no token");
  };
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Not authenticated. Please login",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role(s): ${roles.join(", ")}. Your role: ${req.user.role}`,
      });
    }

    next();
  };
};

// New middleware
export const adminOnly = authorize("admin");
export const authorOrAdmin = authorize("admin", "author");

export const authorizePostAccess = async (req, res, next) => {
  try{
    const post = await Post.findById(req.params.id);

    if(!post) {
      return res.status(404).json({ message: "Post not found"});
    }
    //Admin can access any post
    if(req.user.role === "admin") {
      req.post = post; //attach post to request for use in controller
      return next();
    }
    //author can access their own post
    if(post.author._id.toString() === req.user._id.toString()) {
      req.post = post;
      return next();
    }

    return res.status(403).json({
      message: "Access denied. You can only modify your own posts."
    });
  } catch(error) {
    return res
    .status(500)
    .json({ message: "Server error", error: error.message});
  }
}


//authorization middleware - check if the user can modify user account
export const authorizeUserAccess = async (req, res, next) => {
  try{
    const targetUserId = req.params.id;

    //Admin can modify any user
    if(req.user.role === 'admin'){
      return next();
  }

  //users can only modify their own account
  if (req.user._id.toString() !== targetUserId.toString()){
    return res.status(403).json({
      message: "Access denied. You can only modify your own account",
    });
  }
  next();
} catch (error) {
  return res
  .status(500)
  .json({ message: "Server error", error: error.message});
};
};

// Check if logged in user is the owner
export const isOwner = (req, res, next) => {
  if (req.user._id.toString() !== req.params.id) {
    res.status(403);
    throw new Error("Not authorized to perform this action");
  }
  next();
};

