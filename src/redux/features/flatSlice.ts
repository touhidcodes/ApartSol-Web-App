import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FlatState {
  updatedFlatId: string;
}

const initialState: FlatState = {
  updatedFlatId: "",
};

export const flatSlice = createSlice({
  name: "flat",
  initialState,
  reducers: {
    setUpdateFlatId: (state, action: PayloadAction<string>) => {
      state.updatedFlatId = action.payload;
    },
    removeUpdateFlatId: (state) => {
      state.updatedFlatId = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUpdateFlatId, removeUpdateFlatId } = flatSlice.actions;

export default flatSlice.reducer;
