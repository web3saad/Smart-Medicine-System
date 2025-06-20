import { api } from "./../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page, pageSize, searchText }) =>
        `/products?page=${page}&limit=${pageSize}&searchText=${searchText}`,
      providesTags: ["products"],
    }),

    singleProduct: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["products"],
    }),

    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products/create-product`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSingleProductQuery,
  useUpdateProductMutation,
  useCreateProductMutation,
} = productApi;
