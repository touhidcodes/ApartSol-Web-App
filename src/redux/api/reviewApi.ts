import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReviews: build.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    getUsersReviews: build.query({
      query: () => ({
        url: "/reviews/user",
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    getPropertyReviews: build.query({
      query: (propertyId) => ({
        url: `/reviews/${propertyId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    getSingleReview: build.query({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
    createReview: build.mutation({
      query: ({ propertyId, data }) => ({
        url: `/reviews/${propertyId}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    updateReview: build.mutation({
      query: ({ reviewId, data }) => ({
        url: `/reviews/${reviewId}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    deleteReview: build.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useGetUsersReviewsQuery,
  useGetPropertyReviewsQuery,
  useGetSingleReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
