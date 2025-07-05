import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPayment: build.mutation({
      query: (paymentData) => ({
        url: `/create-payment`,
        method: "POST",
        data: { paymentData },
      }),
      invalidatesTags: [tagTypes.payment],
    }),
    // getPaymentById: build.query({
    //   query: (id) => ({
    //     url: `/payments/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.payment],
    // }),
    // getAllPayments: build.query({
    //   query: () => ({
    //     url: `/payments`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.payment],
    // }),
    // updatePayment: build.mutation({
    //   query: ({ paymentId, paymentData }) => ({
    //     url: `/payments/${paymentId}`,
    //     method: "PUT",
    //     data: paymentData,
    //   }),
    //   invalidatesTags: [tagTypes.payment],
    // }),
    // deletePayment: build.mutation({
    //   query: (paymentId) => ({
    //     url: `/payments/${paymentId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.payment],
    // }),
  }),
});

export const { useCreatePaymentMutation } = paymentApi;
