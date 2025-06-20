/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/students",
      transformResponse: (response: any) => response.data.data,
      providesTags: ["data"],
    }),

    singleUser: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: ["data"],
    }),
    postUser: builder.mutation({
      query: ({ data }) => ({
        url: `/students/create-User`,
        method: "POST",
        body: data,
      }),
    }),

    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),
  }),
});

export const {
  useEditUserMutation,
  usePostUserMutation,
  useSingleUserQuery,
  useGetUsersQuery,
} = userApi;
