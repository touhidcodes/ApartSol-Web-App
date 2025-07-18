import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const propertiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllProperties: build.query({
      query: (queryString) => ({
        url: `/properties?${queryString}`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),
    getPropertyById: build.query({
      query: (propertyId) => ({
        url: `/properties/${propertyId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),
    getUserProperties: build.query({
      query: (queryParams) => ({
        url: `/properties/user?${queryParams}`,
        method: "GET",
      }),
      providesTags: [tagTypes.property],
    }),
    createProperty: build.mutation({
      query: (propertyData) => ({
        url: `/properties`,
        method: "POST",
        data: propertyData,
      }),
      invalidatesTags: [tagTypes.property],
    }),
    updateProperty: build.mutation({
      query: ({ propertyId, propertyData }) => ({
        url: `/properties/${propertyId}`,
        method: "PUT",
        data: propertyData,
      }),
      invalidatesTags: [tagTypes.property],
    }),
    deleteProperty: build.mutation({
      query: (propertyId) => ({
        url: `/properties/${propertyId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.property],
    }),
  }),
});

export const {
  useGetAllPropertiesQuery,
  useGetPropertyByIdQuery,
  useGetUserPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertiesApi;
