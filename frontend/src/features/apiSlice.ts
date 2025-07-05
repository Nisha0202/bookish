import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Book, Borrow, BorrowSummary } from "../features/types";

const BASE_URL = "http://localhost:3000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Books", "Borrows", "Summary"],
  endpoints: (builder) => ({
    getBooks: builder.query<{ books: Book[], total: number }, { page?: number, limit?: number }>({
      query: ({ page = 1, limit = 10 }) => `/books?page=${page}&limit=${limit}`,
      providesTags: ["Books"]
    }),
    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Books", id }]
    }),
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (book) => ({
        url: `/books`,
        method: "POST",
        body: book
      }),
      invalidatesTags: ["Books"]
    }),
    updateBook: builder.mutation<Book, { id: string, data: Partial<Book> }>({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Books", id }]
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Books"]
    }),
    borrowBook: builder.mutation<Borrow, { bookId: string, quantity: number, dueDate: string }>({
      query: (body) => ({
        url: `/borrows`,
        method: "POST",
        body
      }),
      invalidatesTags: ["Books", "Borrows", "Summary"]
    }),
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => `/borrows/summary`,
      providesTags: ["Summary"]
    })
  })
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery
} = api;