import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBookings: build.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    getUserBookings: build.query({
      query: () => ({
        url: "/bookings/",
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    bookingRequest: build.mutation({
      query: ({ propertyId, propertyData }) => ({
        url: `/bookings/${propertyId}`,
        method: "POST",
        data: propertyData,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
  useBookingRequestMutation,
} = bookingApi;
