import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchParams {
  params: string;
}

const initialState: SearchParams = {
  params: "",
};

export const flatSlice = createSlice({
  name: "flat",
  initialState,
  reducers: {
    setSearchParams(state, action: PayloadAction<SearchParams>) {
      state.params = action.payload.params;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSearchParams } = flatSlice.actions;

export default flatSlice.reducer;
