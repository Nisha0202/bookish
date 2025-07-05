import { useGetBorrowSummaryQuery } from "../features/apiSlice";
import { HiOutlineBookOpen, HiOutlineClipboardList, HiOutlineDocumentReport } from "react-icons/hi";

export default function BorrowSummary() {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center min-h-[30vh] text-error gap-2 font-semibold">
        <HiOutlineClipboardList className="text-2xl" />
        Failed to load summary.
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-2 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-3 rounded-full">
          <HiOutlineDocumentReport className="text-2xl text-primary" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold">Borrow Summary</h2>
      </div>
      <div className="card bg-base-100 border border-base-300 rounded-xl">
        <div className="card-body p-2 md:p-4">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full rounded-lg text-base">
              <thead>
                <tr>
                  <th className="whitespace-nowrap text-base font-semibold">
                    <span className="inline-flex items-center gap-1">
                      <HiOutlineBookOpen className="text-lg" />
                      Book Title
                    </span>
                  </th>
                  <th className="whitespace-nowrap text-base font-semibold">
                    ISBN
                  </th>
                  <th className="whitespace-nowrap text-base font-semibold">
                    <span className="inline-flex items-center gap-1">
                      <HiOutlineClipboardList className="text-lg" />
                      Total Borrowed
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((entry: any) => (
                  <tr key={entry.isbn}>
                    <td className="max-w-[200px] md:max-w-xs truncate">{entry.bookTitle}</td>
                    <td className="">{entry.isbn}</td>
                    <td className="">{entry.totalBorrowed}</td>
                  </tr>
                ))}
                {(!data || data.length === 0) && (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-base-content/70">
                      No borrows found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}