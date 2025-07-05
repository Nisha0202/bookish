export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface Borrow {
  _id: string;
  book: string;
  quantity: number;
  dueDate: string;
}

export interface BorrowSummary {
  bookTitle: string;
  isbn: string;
  totalBorrowed: number;
}