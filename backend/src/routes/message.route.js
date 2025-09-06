import express from "express";
import { protectRoute } from '../middleware/auth.js';
import {getUsersForSidebar,getMessages} from "../controllers/message.con.js"

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

//router.post("/send/:id", protectRoute, sendMessage);
export default router;