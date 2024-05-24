import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: `${process.env.BACKEND_URL}` }),
  endpoints: (builder) => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
