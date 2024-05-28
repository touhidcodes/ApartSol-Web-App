import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSingleUser: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    bookingRequest: build.mutation({
      query: (flatId) => ({
        url: "/booking-applications",
        method: "POST",
        data: flatId,
      }),
    }),
  }),
});

export const { useBookingRequestMutation } = bookingApi;
