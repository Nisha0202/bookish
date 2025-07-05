import { useParams, useNavigate } from "react-router-dom";
import {
  useCreateBookMutation,
  useUpdateBookMutation,
  useGetBookQuery
} from "../features/apiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  HiOutlineBookOpen,
  HiOutlineUser,
  HiOutlineBookmark,
  HiOutlineClipboardList,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle
} from "react-icons/hi";

interface Props {
  edit?: boolean;
}


import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { setField, setForm, resetForm } from "../features/bookFormSlice";
export default function BookForm({ edit }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const { data: bookData } = useGetBookQuery(id!, { skip: !edit || !id });



// Inside BookForm
const form = useSelector((state: RootState) => state.bookForm);
const dispatch = useDispatch();

// Instead of useState handler:
const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;
  dispatch(
    setField({ name: name as any, value: type === "number" ? +value : value })
  );
};

// Instead of useEffect for edit:
useEffect(() => {
  if (edit && bookData) {
    dispatch(setForm(bookData));
  }
  return () => {
    dispatch(resetForm());
  };
}, [edit, bookData, dispatch]);





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title?.trim() || !form.author?.trim() || !form.genre?.trim()) {
      toast.warning("Please fill out all required fields.");
      return;
    }

    if (!form.isbn?.match(/^[0-9\-]+$/)) {
      toast.warning("ISBN must contain only numbers and dashes.");
      return;
    }

    if (form.copies! < 0) {
      toast.warning("Copies can't be negative.");
      return;
    }

    try {
      if (edit && id) {
        await updateBook({ id, data: form }).unwrap();
        toast.success("Book edited successfully!");
      } else {
        await createBook(form).unwrap();
        toast.success("Book added successfully!");
      }
      navigate("/books");
    } catch (e: any) {
      const serverMessage = e?.data?.error;
      if (serverMessage?.includes("duplicate")) {
        toast.error("ISBN already exists.");
      } else if (serverMessage?.includes("validation")) {
        toast.error("Invalid data provided. Please check the form.");
      } else {
        toast.error(serverMessage || "Something went wrong.");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto py-4 px-2">
      <style>{`
        input.remove-outline:focus, textarea.remove-outline:focus {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <div className="card bg-base-100 border border-base-300 rounded-xl">
        <div className="card-body p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-primary/10 rounded-full p-3">
              <HiOutlineBookOpen className="text-xl text-primary" />
            </div>
            <h2 className="text-xl font-bold">
              {edit ? "Edit Book" : "Add Book"}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text flex items-center gap-1">
                  <HiOutlineBookOpen />
                  Title <span className="text-error">*</span>
                </span>
              </div>
              <input
                name="title"
                value={form.title || ""}
                onChange={handleChange}
                placeholder="Book title"
                className="input input-bordered w-full remove-outline mb-4"
                
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text flex items-center gap-1">
                  <HiOutlineUser />
                  Author <span className="text-error">*</span>
                </span>
              </div>
              <input
                name="author"
                value={form.author || ""}
                onChange={handleChange}
                placeholder="Author"
                className="input input-bordered w-full remove-outline mb-4"
                
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text flex items-center gap-1">
                  <HiOutlineBookmark />
                  Genre <span className="text-error">*</span>
                </span>
              </div>
              <input
                name="genre"
                value={form.genre || ""}
                onChange={handleChange}
                placeholder="Genre"
                className="input input-bordered w-full remove-outline mb-4"
             
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text flex items-center gap-1">
                  <HiOutlineClipboardList />
                  ISBN <span className="text-error">*</span>
                </span>
              </div>
              <input
                name="isbn"
                value={form.isbn || ""}
                onChange={handleChange}
                placeholder="ISBN"
                className="input input-bordered w-full remove-outline"
                
                pattern="^[0-9\-]+$"
              />
             <div className="label w-full block mb-4">
                <span className="label-text-alt">Numbers and dashes only</span>
              </div>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text flex items-center gap-1">
                  <HiOutlineDocumentText />
                  Description
                </span>
              </div>
              <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                placeholder="Short description"
                className="textarea textarea-bordered w-full remove-outline mb-4"
                rows={3}
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text flex items-center gap-1">
                  <HiOutlineCheckCircle />
                  Copies <span className="text-error">*</span>
                </span>
              </div>
              <input
                name="copies"
                type="number"
                value={form.copies || 0}
                onChange={handleChange}
                placeholder="Copies"
                className="input input-bordered w-full remove-outline mb-4"
                min={0}
               
              />
            </label>
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {edit ? (
                <>
                  <HiOutlineCheckCircle className="text-lg" />
                  Edit Book
                </>
              ) : (
                <>
                  <HiOutlineCheckCircle className="text-lg" />
                  Add Book
                </>
              )}
            </button>
          </form>
          <div className="mt-6 text-xs text-base-content/70 text-right">
            <span className="flex items-center gap-1 justify-end">
              <HiOutlineExclamationCircle className="text-warning" />
              <span>Fields marked with <span className="text-error">*</span> are required.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}