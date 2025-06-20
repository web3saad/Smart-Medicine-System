import { api } from "./../../api/apiSlice";

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      transformResponse: (response: any) => {
        // Map each product to add a full URL for the image
        if (response && response.data) {
          response.data = response.data.map((product: any) => ({
            ...product,
            url: product.imageUrl
              ? `http://localhost:5001/uploads/products/${product.imageUrl}`
              : null,
          }));
        }
        return response;
      },
    }),

    singleProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useSingleProductQuery } = productApi;
