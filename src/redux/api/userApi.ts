import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getUserWithProfile: build.query({
      query: () => ({
        url: "/user-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    UpdateUserProfile: build.mutation({
      query: (userData) => ({
        url: "/profile",
        method: "PUT",
        data: userData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useGetUserWithProfileQuery,
  useUpdateUserProfileMutation,
} = userApi;
