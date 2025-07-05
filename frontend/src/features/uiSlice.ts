import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface UIState {
  bookPage: number;
}

const initialState: UIState = {
  bookPage: 1,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setBookPage: (state, action: PayloadAction<number>) => {
      state.bookPage = action.payload;
    }
  }
});

export const { setBookPage } = uiSlice.actions;
export default uiSlice.reducer;
