
import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction } from "@reduxjs/toolkit";
import type { Book } from "./types";


type BookFormState = Omit<Partial<Book>, "_id">;

const initialState: BookFormState = {
  title: "",
  author: "",
  genre: "",
  isbn: "",
  description: "",
  copies: 1,
  available: true
};

const bookFormSlice = createSlice({
  name: "bookForm",
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{ name: keyof BookFormState; value: string | number | boolean }>
    ) => {
      const { name, value } = action.payload;
      state[name] = value as any;
    },
    setForm: (state, action: PayloadAction<BookFormState>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState
  }
});

export const { setField, setForm, resetForm } = bookFormSlice.actions;
export default bookFormSlice.reducer;
