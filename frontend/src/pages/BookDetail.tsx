import { useParams, Link } from "react-router-dom";
import { useGetBookQuery } from "../features/apiSlice";
import {
  HiOutlineUser,
  HiOutlineBookmark,
  HiOutlineBookOpen,
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineDocumentText,
  HiOutlinePencilAlt,
  HiOutlineReply,
  HiOutlineAcademicCap
} from "react-icons/hi";

export default function BookDetail() {
  const { id } = useParams();
  const { data: book, isLoading, error } = useGetBookQuery(id!);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  if (error)
    return (
      <div className="text-error text-center py-8 text-lg font-semibold">
        Error loading book.
      </div>
    );
  if (!book)
    return (
      <div className="text-center py-12 text-lg font-semibold">
        Book not found
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto px-2 py-8">
      <div className="card bg-base-100 rounded-xl border border-base-300">
        <div className="card-body p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 rounded-full p-3">
              <HiOutlineAcademicCap className="text-3xl text-primary" />
            </div>
            <h1 className="card-title text-3xl font-bold break-words">
              {book.title}
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-4">
            <div className="flex items-center gap-2">
              <HiOutlineUser className="text-lg text-primary" />
              <span className="font-medium">Author:</span>
              <span className="truncate">{book.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineBookmark className="text-lg text-secondary" />
              <span className="font-medium">Genre:</span>
              <span>{book.genre}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineClipboardList className="text-lg text-accent" />
              <span className="font-medium">ISBN:</span>
              <span className="truncate">{book.isbn}</span>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineBookOpen className="text-lg text-info" />
              <span className="font-medium">Copies:</span>
              <span>{book.copies}</span>
            </div>
            <div className="flex items-center gap-2">
              {book.available ? (
                <HiOutlineCheckCircle className="text-success text-lg" />
              ) : (
                <HiOutlineXCircle className="text-error text-lg" />
              )}
              <span className="font-medium">Available:</span>
              <span>
                {book.available ? (
                  <span className="badge badge-success badge-outline badge-sm px-2">
                    Yes
                  </span>
                ) : (
                  <span className="badge badge-error badge-outline badge-sm px-2">
                    No
                  </span>
                )}
              </span>
            </div>
          </div>
          {book.description && (
            <div className="mt-6 flex items-start gap-2">
              <HiOutlineDocumentText className="text-lg text-warning mt-1" />
              <div>
                <div className="font-medium mb-1">Description:</div>
                <p className="text-base leading-relaxed break-words">
                  {book.description}
                </p>
              </div>
            </div>
          )}
          <div className="divider my-4" />
          <div className="card-actions flex flex-col sm:flex-row gap-2 justify-end">
            <Link
              to={`/edit-book/${book._id}`}
              className="btn btn-primary btn-outline flex-1 sm:flex-none gap-2"
            >
              <HiOutlinePencilAlt className="text-lg" />
              Edit
            </Link>
            <Link
              to={`/borrow/${book._id}`}
              className="btn btn-secondary btn-outline flex-1 sm:flex-none gap-2"
              aria-disabled={!book.available}
              tabIndex={!book.available ? -1 : undefined}
            >
              <HiOutlineBookOpen className="text-lg" />
              Borrow
            </Link>
            <Link
              to="/books"
              className="btn btn-outline flex-1 sm:flex-none gap-2  hover:dark:bg-gray-600"
            >
              <HiOutlineReply className="text-lg" />
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}