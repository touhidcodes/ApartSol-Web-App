import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUserRegistrationTrends: build.query({
      query: () => ({
        url: `/user-reg`,
        method: "GET",
      }),
    }),
    getMonthlyTotalUsers: build.query({
      query: () => ({
        url: `/user-month`,
        method: "GET",
      }),
    }),
    getUserByRole: build.query({
      query: () => ({
        url: `/user-role`,
        method: "GET",
      }),
    }),
    getTotalUserCount: build.query({
      query: () => ({
        url: `/user-all`,
        method: "GET",
      }),
    }),
    getTotalPostCount: build.query({
      query: () => ({
        url: `/post-all`,
        method: "GET",
      }),
    }),
    getTotalBookingsCount: build.query({
      query: () => ({
        url: `/bookings-all`,
        method: "GET",
      }),
    }),
    getTotalBookingsByUser: build.query({
      query: () => ({
        url: `/total-bookings-user`,
        method: "GET",
      }),
    }),
    getBookingsByUser: build.query({
      query: () => ({
        url: `/bookings-user`,
        method: "GET",
      }),
    }),
    getTotalFlatPostByUser: build.query({
      query: () => ({
        url: `/total-flats-user`,
        method: "GET",
      }),
    }),
    getFlatPostByUser: build.query({
      query: () => ({
        url: `/flats-user`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMonthlyTotalUsersQuery,
  useGetUserByRoleQuery,
  useGetUserRegistrationTrendsQuery,
  useGetTotalUserCountQuery,
  useGetTotalPostCountQuery,
  useGetTotalBookingsCountQuery,
  useGetTotalBookingsByUserQuery,
  useGetTotalFlatPostByUserQuery,
  useGetBookingsByUserQuery,
  useGetFlatPostByUserQuery,
} = dashboardApi;
