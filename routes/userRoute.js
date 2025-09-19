import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  searchUsers,
  loginUser,
  logoutUser
} from "../controllers/userController.js";
import { protect, authorizeUserAccess,  isOwner, adminOnly } from "../middleware/authMiddleware.js";

import { updateUserRole } from "../controllers/userController.js";

import { paginate } from "../middleware/paginate.js"
import User from "../models/userModel.js";

const router = express.Router();

router.get("/", paginate(User), getAllUsers);
router.post("/", createUser);
router.get("/", protect, adminOnly, getAllUsers);
router.get("/search", searchUsers);
router.get("/:id", getUserById);
router.patch("/:id", protect, authorizeUserAccess, updateUser);
router.patch("/:id/role", protect, adminOnly, updateUserRole);
router.delete("/:id", protect, authorizeUserAccess, deleteUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
