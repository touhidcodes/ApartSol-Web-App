import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const flatsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllFlats: build.query({
      query: (params) => ({
        url: `/flats?${params}`,
        method: "GET",
      }),
      providesTags: [tagTypes.flat],
    }),
    getFlatById: build.query({
      query: (id) => ({
        url: `/flats/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.flat],
    }),
    getMyFlats: build.query({
      query: () => ({
        url: `/my-flats`,
        method: "GET",
      }),
      providesTags: [tagTypes.flat],
    }),
    createFlat: build.mutation({
      query: (flatData) => ({
        url: `/flats`,
        method: "POST",
        data: flatData,
      }),
      invalidatesTags: [tagTypes.flat],
    }),
    updateFlat: build.mutation({
      query: ({ flatId, flatData }) => ({
        url: `/flats/${flatId}`,
        method: "PUT",
        data: flatData,
      }),
      invalidatesTags: [tagTypes.flat],
    }),
    deleteFlat: build.mutation({
      query: (flatId) => ({
        url: `/flats/${flatId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.flat],
    }),
  }),
});

export const {
  useGetAllFlatsQuery,
  useGetFlatByIdQuery,
  useGetMyFlatsQuery,
  useCreateFlatMutation,
  useUpdateFlatMutation,
  useDeleteFlatMutation,
} = flatsApi;
