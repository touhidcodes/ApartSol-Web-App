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
  }),
});

export const { useGetAllFlatsQuery, useGetFlatByIdQuery } = flatsApi;
