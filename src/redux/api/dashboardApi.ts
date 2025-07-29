import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Shared (ADMIN, USER)
    getUserRegistrationTrends: build.query({
      query: () => ({
        url: `/dashboard/user-reg`,
        method: "GET",
      }),
    }),
    getMonthlyTotalUsers: build.query({
      query: () => ({
        url: `/dashboard/user-month`,
        method: "GET",
      }),
    }),
    getUserByRole: build.query({
      query: () => ({
        url: `/dashboard/user-role`,
        method: "GET",
      }),
    }),
    getTotalUserCount: build.query({
      query: () => ({
        url: `/dashboard/user-all`,
        method: "GET",
      }),
    }),
    getTotalPostCount: build.query({
      query: () => ({
        url: `/dashboard/post-all`,
        method: "GET",
      }),
    }),
    getTotalBookingsCount: build.query({
      query: () => ({
        url: `/dashboard/bookings-all`,
        method: "GET",
      }),
    }),
    getTotalBookingsByUser: build.query({
      query: () => ({
        url: `/dashboard/total-bookings-user`,
        method: "GET",
      }),
    }),
    getBookingsByUser: build.query({
      query: () => ({
        url: `/dashboard/bookings-user`,
        method: "GET",
      }),
    }),
    getTotalPropertyPostByUser: build.query({
      query: () => ({
        url: `/dashboard/total-flats-user`,
        method: "GET",
      }),
    }),
    getPropertyPostByUser: build.query({
      query: () => ({
        url: `/dashboard/flats-user`,
        method: "GET",
      }),
    }),
    getUserDashboardStats: build.query({
      query: () => ({
        url: `/dashboard/user-dashboard`,
        method: "GET",
      }),
    }),

    // Admin-only
    getPropertyTypesDistribution: build.query({
      query: () => ({
        url: `/dashboard/property-type`,
        method: "GET",
      }),
    }),
    getMonthlySalesData: build.query({
      query: () => ({
        url: `/dashboard/monthly-sales`,
        method: "GET",
      }),
    }),
    getRecentProperties: build.query({
      query: () => ({
        url: `/dashboard/recent-properties`,
        method: "GET",
      }),
    }),
    getRecentBookings: build.query({
      query: () => ({
        url: `/dashboard/recent-bookings`,
        method: "GET",
      }),
    }),
    getTopLocations: build.query({
      query: () => ({
        url: `/dashboard/top-locations`,
        method: "GET",
      }),
    }),
    getTotalRevenue: build.query({
      query: () => ({
        url: `/dashboard/total-revenue`,
        method: "GET",
      }),
    }),
    getMonthlyRevenueGrowth: build.query({
      query: () => ({
        url: `/dashboard/monthly-revenue-growth`,
        method: "GET",
      }),
    }),
    getUserGrowthStats: build.query({
      query: () => ({
        url: `/dashboard/user-growth`,
        method: "GET",
      }),
    }),
    getPropertyGrowthStats: build.query({
      query: () => ({
        url: `/dashboard/property-growth`,
        method: "GET",
      }),
    }),
    getMonthlyRevenueBreakdown: build.query({
      query: () => ({
        url: `/dashboard/monthly-revenue-breakdown`,
        method: "GET",
      }),
    }),
    getAdminDashboardStats: build.query({
      query: () => ({
        url: `/dashboard/admin-dashboard`,
        method: "GET",
      }),
    }),
    getBookingStatusDistribution: build.query({
      query: () => ({
        url: `/dashboard/booking-status`,
        method: "GET",
      }),
    }),
    getPaymentMethodDistribution: build.query({
      query: () => ({
        url: `/dashboard/payment-methods`,
        method: "GET",
      }),
    }),
    getUserStatusDistribution: build.query({
      query: () => ({
        url: `/dashboard/user-status`,
        method: "GET",
      }),
    }),
    //  new apis
    getUserPropertyTypesDistribution: build.query({
      query: () => ({
        url: `/dashboard/user-property-types`,
        method: "GET",
      }),
    }),

    getUserMonthlySalesData: build.query({
      query: () => ({
        url: `/dashboard/user-monthly-sales`,
        method: "GET",
      }),
    }),

    getUserRecentProperties: build.query({
      query: ({ limit = 10 }) => ({
        url: `/dashboard/user-recent-properties?limit=${limit}`,
        method: "GET",
      }),
    }),

    getUserRecentBookings: build.query({
      query: ({ limit = 10 }) => ({
        url: `/dashboard/user-recent-bookings?limit=${limit}`,
        method: "GET",
      }),
    }),

    getUserMonthlyRevenueBreakdown: build.query({
      query: () => ({
        url: `/dashboard/user-monthly-revenue-breakdown`,
        method: "GET",
      }),
    }),

    getUserPropertyBookingTrends: build.query({
      query: () => ({
        url: `/dashboard/user-property-booking-trends`,
        method: "GET",
      }),
    }),

    getUserTotalRevenue: build.query({
      query: () => ({
        url: `/dashboard/user-total-revenue`,
        method: "GET",
      }),
    }),

    getUserMonthlyRevenueGrowth: build.query({
      query: () => ({
        url: `/dashboard/user-monthly-revenue-growth`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  // Shared
  useGetUserRegistrationTrendsQuery,
  useGetMonthlyTotalUsersQuery,
  useGetUserByRoleQuery,
  useGetTotalUserCountQuery,
  useGetTotalPostCountQuery,
  useGetTotalBookingsCountQuery,
  useGetTotalBookingsByUserQuery,
  useGetBookingsByUserQuery,
  useGetTotalPropertyPostByUserQuery,
  useGetPropertyPostByUserQuery,
  useGetUserDashboardStatsQuery,

  // Admin
  useGetPropertyTypesDistributionQuery,
  useGetMonthlySalesDataQuery,
  useGetRecentPropertiesQuery,
  useGetRecentBookingsQuery,
  useGetTopLocationsQuery,
  useGetTotalRevenueQuery,
  useGetMonthlyRevenueGrowthQuery,
  useGetUserGrowthStatsQuery,
  useGetPropertyGrowthStatsQuery,
  useGetMonthlyRevenueBreakdownQuery,
  useGetAdminDashboardStatsQuery,
  useGetBookingStatusDistributionQuery,
  useGetPaymentMethodDistributionQuery,
  useGetUserStatusDistributionQuery,

  // NEW: User-specific hooks
  useGetUserPropertyTypesDistributionQuery,
  useGetUserMonthlySalesDataQuery,
  useGetUserRecentPropertiesQuery,
  useGetUserRecentBookingsQuery,
  useGetUserMonthlyRevenueBreakdownQuery,
  useGetUserPropertyBookingTrendsQuery,
  useGetUserTotalRevenueQuery,
  useGetUserMonthlyRevenueGrowthQuery,
} = dashboardApi;
