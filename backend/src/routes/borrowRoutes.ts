import express from "express";
import { borrowBook, borrowSummary } from "../controllers/borrowController";

const router = express.Router();

router.post("/", borrowBook);
router.get("/summary", borrowSummary);

export default router;

