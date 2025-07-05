import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery, useBorrowBookMutation } from "../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { setQuantity, setDueDate, resetBorrowForm } from "../features/borrowFormSlice";

import { toast } from "react-toastify";
import {
  HiOutlineBookOpen,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineUserGroup,
  HiOutlineArrowLeft
} from "react-icons/hi";

export default function BorrowForm() {
  const { bookId } = useParams();
  const { data: book, isLoading } = useGetBookQuery(bookId!);
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();

  const quantity = useSelector((state: RootState) => state.borrowForm.quantity);
  const dueDate = useSelector((state: RootState) => state.borrowForm.dueDate);
  const dispatch = useDispatch();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dueDate) return toast.error("Due date required");
    if (quantity < 1) return toast.error("Quantity must be at least 1");
    if (book && quantity > book.copies)
      return toast.error("Not enough copies available");
    try {
      await borrowBook({ bookId: bookId!, quantity, dueDate }).unwrap();
      dispatch(resetBorrowForm());

      toast.success("Book borrowed!");
      navigate("/borrow-summary");
    } catch (e: any) {
      toast.error(e.data?.error || "Failed to borrow.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  if (!book)
    return (
      <div className="flex flex-col items-center justify-center min-h-[30vh]">
        <HiOutlineExclamationCircle className="text-4xl text-error mb-2" />
        <span className="text-lg font-medium text-error">Book not found</span>
        <button
          onClick={() => navigate("/books")}
          className="btn btn-outline mt-4 gap-2"
        >
          <HiOutlineArrowLeft /> Back to Books
        </button>
      </div>
    );

  return (
    <div className="max-w-md mx-auto py-8 px-2">
      <style>{`
        input.remove-outline:focus, textarea.remove-outline:focus {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <div className="card bg-base-100 border border-base-300 rounded-xl">
        <div className="card-body p-6 md:p-8">
          <div className="flex flex-col mb-4">

            <div className="flex flex-row items-center gap-2">
              <h2 className="text-xl font-bold">Borrow</h2>
              <HiOutlineBookOpen className="text-3xl text-primary" />
            </div> <div className="text-base-content/70 font-medium mt-1 break-words">{book.title}</div>

          </div>
          <div className="mb-4 flex flex-wrap gap-4 text-sm text-base-content/80">
            <div className="flex items-center gap-1">
              <HiOutlineUserGroup className="text-lg" />
              <span>Available:</span>
              <span className="badge badge-outline badge-success">{book.copies}</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text flex items-center gap-1">
                    <HiOutlineCheckCircle className="text-primary" /> Quantity
                  </span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full remove-outline"
                  value={quantity}
                  onChange={(e) => dispatch(setQuantity(+e.target.value))}
                />


                <div className="label">
                  <span className="label-text-alt text-xs">
                    Max: {book.copies}
                  </span>
                </div>
              </label>
            </div>
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text flex items-center gap-1">
                    <HiOutlineCalendar className="text-secondary" /> Due Date
                  </span>
                </div>

            <input
  type="date"
  className="input input-bordered w-full remove-outline"
  value={dueDate}
  onChange={(e) => dispatch(setDueDate(e.target.value))}
/>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={book.copies === 0}
            >
              <HiOutlineCheckCircle className="text-lg" />
              Borrow
            </button>
            {book.copies === 0 && (
              <div className="alert alert-warning shadow-sm mt-2 flex items-center gap-2 text-warning">
                <HiOutlineExclamationCircle className="text-xl" />
                No copies available to borrow.
              </div>
            )}
          </form>
          <button
            type="button"
            className="btn btn-outline mt-4 py-4 w-full flex items-center gap-2"
            onClick={() => navigate("/books")}
          >
            <HiOutlineArrowLeft className="text-md" />
            Back to Books
          </button>
        </div>
      </div>
    </div>
  );
}