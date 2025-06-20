/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "../../api/apiSlice";

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: (id) => `/order/${id}`,
    }),

    createOrder: builder.mutation({
      query: ({ data }) => ({
        url: `/order/create-order`,
        method: "POST",
        body: data,
      }),
    }),

    deleteOrder: builder.mutation({
      query: ({ email, cartItemId }) => ({
        url: "/cart",
        method: "DELETE",
        body: { email: email, cartItemId: cartItemId },
      }),
    }),

    updateCart: builder.mutation({
      query: ({ email, enrolled }) => ({
        url: `/cart/update`,
        method: "PATCH",
        body: {
          enrolled: enrolled,
          email: email,
        },
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetAllOrderQuery,
  useUpdateCartMutation,
} = cartApi;
