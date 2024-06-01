import { baseApi } from "./api/baseApi";
import flatReducer from "./features/flatSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  flat: flatReducer,
};
