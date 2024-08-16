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
  }),
});

export const {
  useGetMonthlyTotalUsersQuery,
  useGetUserByRoleQuery,
  useGetUserRegistrationTrendsQuery,
} = dashboardApi;
