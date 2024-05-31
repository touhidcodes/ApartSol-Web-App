import { baseApi } from "./baseApi";

export const flatsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllFlats: build.query({
      query: () => ({
        url: "/flats",
        method: "GET",
      }),
    }),
    getFlatById: build.query({
      query: (id) => ({
        url: `/flats/${id}`,
        method: "GET",
      }),
    }),
    getMyFlats: build.query({
      query: () => ({
        url: `/my-flats`,
        method: "GET",
      }),
    }),
    createFlat: build.mutation({
      query: (flatData) => ({
        url: `/flats`,
        method: "POST",
        data: flatData,
      }),
    }),
  }),
});

export const {
  useGetAllFlatsQuery,
  useGetFlatByIdQuery,
  useGetMyFlatsQuery,
  useCreateFlatMutation,
} = flatsApi;
