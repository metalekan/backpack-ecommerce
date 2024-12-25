import express from "express";
import {
  register,
  login,
  getAllUsers,
  logout,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(register).get(authenticate, authorizeAdmin, getAllUsers);
router.post("/login", login);
router.post("/logout", logout);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .patch(authenticate, updateCurrentUserProfile);

// ADMIN
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .patch(authenticate, authorizeAdmin, updateUserById);

export default router;
