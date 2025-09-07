import express from "express";
import { protectRoute } from '../middleware/auth.js';
import {getUsersForSidebar,getMessages} from "../controllers/message.con.js"

const router = express.Router();

// List users for sidebar (frontend calls /messages/users)
router.get("/users", protectRoute, getUsersForSidebar);

// Get messages between logged-in user and :id
router.get("/:id", protectRoute, getMessages);

//router.post("/send/:id", protectRoute, sendMessage);
export default router;