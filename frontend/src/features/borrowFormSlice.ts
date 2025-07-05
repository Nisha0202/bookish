// features/borrowFormSlice.ts
import { createSlice} from "@reduxjs/toolkit";
import type {PayloadAction } from "@reduxjs/toolkit";
interface BorrowFormState {
  quantity: number;
  dueDate: string;
}

const initialState: BorrowFormState = {
  quantity: 1,
  dueDate: ""
};

const borrowFormSlice = createSlice({
  name: "borrowForm",
  initialState,
  reducers: {
    setQuantity(state, action: PayloadAction<number>) {
      state.quantity = action.payload;
    },
    setDueDate(state, action: PayloadAction<string>) {
      state.dueDate = action.payload;
    },
    resetBorrowForm() {
      return initialState;
    }
  }
});

export const { setQuantity, setDueDate, resetBorrowForm } = borrowFormSlice.actions;
export default borrowFormSlice.reducer;
