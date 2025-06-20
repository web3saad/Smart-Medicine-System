import { api } from "../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/products",
    }),

    singleUser: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: ["address", "phone"],
    }),

    getRequestedProduct: builder.query({
      query: (id) => `/productRequest/${id}`,
      providesTags: ["data", "quantity", "productDescription"],
    }),

    postUser: builder.mutation({
      query: ({ data }) => ({
        url: `/students/create-User`,
        method: "POST",
        body: data,
      }),
    }),

    postProductRequest: builder.mutation({
      query: ({ data }) => ({
        url: `/productRequest/create-request`,
        method: "POST",
        body: data,
      }),
    }),

    deleteRequestedProduct: builder.mutation({
      query: (id) => ({
        url: `/productRequest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["data", "quantity", "productDescription"],
    }),

    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["address", "phone"],
    }),
  }),
});

export const {
  useEditUserMutation,
  useGetRequestedProductQuery,
  usePostProductRequestMutation,
  usePostUserMutation,
  useDeleteRequestedProductMutation,
  useSingleUserQuery,
} = productApi;
