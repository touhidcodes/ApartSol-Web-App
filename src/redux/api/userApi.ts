import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getUserWithProfile: build.query({
      query: () => ({
        url: "/user-profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSingleUserQuery, useGetUserWithProfileQuery } = userApi;
