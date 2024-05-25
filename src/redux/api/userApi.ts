import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSingleUserQuery } = userApi;
