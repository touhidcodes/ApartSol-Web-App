import { tagTypes } from "../tags";
import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBlogs: build.query({
      query: (params) => ({
        url: `/blogs?${params}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    getBlogById: build.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    getMyBlogs: build.query({
      query: () => ({
        url: `/blogs/my-blogs`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    createBlog: build.mutation({
      query: (blogData) => ({
        url: `/blogs`,
        method: "POST",
        data: blogData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    updateBlog: build.mutation({
      query: ({ blogId, blogData }) => ({
        url: `/blogs/${blogId}`,
        method: "PUT",
        data: blogData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    deleteBlog: build.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useGetMyBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
