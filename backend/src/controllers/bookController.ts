import { Request, Response } from "express";
import Book from "../models/Book";


export const getBooks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const books = await Book.find()
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .sort({ createdAt: -1 });
    const total = await Book.countDocuments();
    res.json({ books, total });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
};

export const getBook = async (req: Request, res: Response) : Promise<any> => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found." });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ error: "Book not found." });
    res.json(book);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<any> => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found." });
    res.json({ message: "Book deleted." });
    return;
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book." });
    return;
  }
};

