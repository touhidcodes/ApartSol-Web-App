import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tags";

// TODO: change base url before production
// const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;
const baseUrl = `${process.env.NEXT_PUBLIC_LOCAL_URL}`;
// http://localhost:5000/api/v1

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
