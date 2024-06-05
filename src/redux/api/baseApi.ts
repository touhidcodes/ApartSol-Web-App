import { axiosBaseQuery } from "@/helpers/axios/axiosBaseQuery";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tags";

// baseUrl: `http://localhost:5000/api`,
// baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
const baseUrl = `https://flat-sharing-app.vercel.app/api`;
// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({}),
  tagTypes: tagTypesList,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
