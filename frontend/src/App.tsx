import './App.css'

import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookList from "./pages/BookList";
import BookForm from "./pages/BookForm";
import BookDetail from "./pages/BookDetail";
import BorrowForm from "./pages/BorrowForm";
import BorrowSummary from "./pages/BorrowSummary";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/create-book" element={<BookForm />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/edit-book/:id" element={<BookForm edit />} />
          <Route path="/borrow/:bookId" element={<BorrowForm />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

