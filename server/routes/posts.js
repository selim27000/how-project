import express from "express";
import { getFeedPosts, getUserPosts, likePost, createComment, updateComment, deleteComment, getPostComments } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* POSTS */
router.get("/:id", verifyToken, getFeedPosts);
router.get("/:userId/posts", getUserPosts);
// VOIR POURQUOI MARCHE PAS AVEC LE TOKEN

/* COMMENTS */
router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/comments", verifyToken, createComment);
router.patch("/:id/comments/:commentId", verifyToken, updateComment);
router.delete("/:id/comments/:commentId", verifyToken, deleteComment);
router.get("/:postId/comments", getPostComments);

export default router;
