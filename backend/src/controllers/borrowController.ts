import { Request, Response } from "express";
import Borrow from "../models/Borrow";
import Book from "../models/Book";

export const borrowBook = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);

    if (!book) return res.status(404).json({ error: "Book not found." });
    if (!book.available || book.copies < quantity)
      return res.status(400).json({ error: "Not enough copies available." });

    const borrow = new Borrow({
      book: bookId,
      quantity,
      dueDate
    });

    await borrow.save();

    book.copies -= quantity;
    if (book.copies === 0) book.available = false;
    await book.save();

    res.status(201).json(borrow);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const borrowSummary = async (_req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalBorrowed: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book"
        }
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          bookTitle: "$book.title",
          isbn: "$book.isbn",
          totalBorrowed: 1
        }
      }
    ]);
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summary." });
  }
};