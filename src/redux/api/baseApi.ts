import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tags";

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
// const baseUrl = `http://localhost:5000/api`;

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
