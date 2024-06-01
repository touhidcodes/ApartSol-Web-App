import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBookings: build.query({
      query: () => ({
        url: "/booking-requests",
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    getMyBookings: build.query({
      query: () => ({
        url: "/my-bookings",
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    bookingRequest: build.mutation({
      query: (flatId) => ({
        url: "/booking-applications",
        method: "POST",
        data: flatId,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetMyBookingsQuery,
  useBookingRequestMutation,
} = bookingApi;
