import User from "../models/userModel.js";
import mongoose from "mongoose";
import generateToken from "../utils/generateToken.js";
import { raw } from "express";

// Create a new user
export const createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
     if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ firstName, lastName, email, password, role });

    if(user){
      generateToken(res, user._id)
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    }else{
      res.status(400);
      throw new Error("Invalid user data");
    };
    
  } catch (error) {
    next(error)
  }
};

export const loginUser = async (req, res, next) => {
  try{
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({ message: "User logged in" });
  } 
  else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
}catch(error){
  next(error);
}
};

export const logoutUser = (req, res, next) => {
  try{
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logged out successfully" });
} catch(error){
  next(error);
};
};

export const getAllUsers = async (req, res, next) => {
  try {
    res.status(200).json({
      paginateData: res.locals.paginatedResults,
    })
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid user id" });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
   try {
    const { firstName, lastName, email, password } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { firstName, lastName, email, password },
        { new: true }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });

  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    if (req.user._id.toString() === req.params.id.toString()) {
      return res.status(403).json({ message: "Admins cannot change their own role" });
  }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  };
};

export const deleteUser = async (req, res, next) => {
  try{
  
    const deleteUser = await User.findByIdAndDelete(
       req.params.id);

  if(!deleteUser){
    return res
      .status(404)
      .json({ success: false, message: "User not found" });
  }
  res.status(200).json({
    success: true,
    message: "User deleted",
    data: deleteUser
  });

    res.status(403).json({success: false,
      message: "Not authorized" });
  
} catch(error){
  next(error);
};
};

//search users by first or last name
export const searchUsers = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: "Query param 'name' is required" });

    //search on firstName OR lastName
    const regex = new RegExp(name, "i");
    const users = await User.find({ $or: [{ firstName: regex }, { lastName: regex }] });
    return res.json(users);
  } catch (err) {
    next(err);
  }
};
