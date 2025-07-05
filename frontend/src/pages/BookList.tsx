import { Link, useNavigate } from "react-router-dom";
import {
  useGetBooksQuery,
  useDeleteBookMutation
} from "../features/apiSlice";
import { toast } from "react-toastify";
import { HiOutlineEye, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineBookOpen, HiOutlinePlus } from "react-icons/hi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { setBookPage } from "../features/uiSlice";
export default function BookList() {


  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.ui.bookPage);
const { data, isLoading, error, refetch } = useGetBooksQuery({ page, limit: 10 });

  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();



  const [deleteId, setDeleteId] = useState<string | null>(null);


  const handleDelete = async (id: string) => {
  
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted");
      refetch();
      setDeleteId(null);
    } catch (e: any) {
      toast.error(e.data?.error || "Delete failed");
       setDeleteId(null);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center py-10">Loading…</div>;
  if (error) return <div className="text-error text-center py-8">Error loading books.</div>;

  return (
    <div className="max-w-6xl mx-auto px-2">
      <div className="flex flex-row  justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Books</h1>
        <Link to="/create-book" className="btn btn-primary gap-2">
          <HiOutlinePlus className="text-xl" />
          Add Book
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full rounded-box">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th className="hidden sm:table-cell">Genre</th>
              <th className="hidden md:table-cell">ISBN</th>
              <th className="hidden md:table-cell">Copies</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.books.map((book: any) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td className="hidden sm:table-cell">{book.genre}</td>
                <td className="hidden md:table-cell">{book.isbn}</td>
                <td className="hidden md:table-cell">{book.copies}</td>
                <td>
                  {book.available ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="badge badge-success badge-xs"></span>
                      <span className="sr-only">Available</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <span className="badge badge-error badge-xs"></span>
                      <span className="sr-only">Not Available</span>
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    <Link
                      to={`/books/${book._id}`}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="View"
                    >
                      <HiOutlineEye className="text-lg" />
                    </Link>
                    <button
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="Edit"
                    >
                      <HiOutlinePencilAlt className="text-lg" />
                    </button>
                    <button
                      onClick={() => setDeleteId(book._id)}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="Delete"
                    >
                      <HiOutlineTrash className="text-lg text-error" />
                    </button>
                    <button
                      onClick={() => navigate(`/borrow/${book._id}`)}
                      className="btn btn-ghost btn-xs tooltip"
                      data-tip="Borrow"
                      disabled={!book.available || book.copies === 0}
                    >
                      <HiOutlineBookOpen className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {data?.books.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4">No books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data?.total && (
        <div className="flex justify-center mt-6 gap-2 text-gray-600 dark:text-gray-200">
          <button
            className="btn btn-sm border-2 border-gray-200 dark:border-gray-600 "
            disabled={page === 1}
            onClick={() => dispatch(setBookPage(page - 1))}
          >
            Previous
          </button>
          <span className="btn btn-sm btn-disabled border">
            Page {page} of {Math.ceil(data.total / 10)}
          </span>
          <button
            className="btn btn-sm border-2 border-gray-200 dark:border-gray-600"
            disabled={page === Math.ceil(data.total / 10)}
            onClick={() => dispatch(setBookPage(page + 1))}
          >
            Next
          </button>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 rounded-lg p-6 shadow-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-sm">Are you sure you want to delete this book?</p>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-error"
                 onClick={() => handleDelete(deleteId)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}