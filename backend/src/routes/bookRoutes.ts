import express from "express";
import {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController"; 

const router = express.Router();


router.get("/", getBooks);
router.post("/", createBook);
router.get("/:id", getBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;