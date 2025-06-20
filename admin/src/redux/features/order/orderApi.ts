import { api } from "../../api/apiSlice";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrderForAdmin: builder.query({
      query: () => `/order/all-orders`,
      transformResponse: (res: any) => res.data,
      providesTags: ["data"],
    }),
    singleOrder: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: ["data"],
    }),

    updateOrder: builder.mutation({
      query: ({ data, id }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["data"],
    }),
  }),
});

export const {
  useUpdateOrderMutation,
  useGetAllOrderForAdminQuery,
  useSingleOrderQuery,
} = orderApi;
