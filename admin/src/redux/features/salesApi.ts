import { api } from "../api/apiSlice";

const salesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getLastMonthSalesSummary: builder.query({
      query: () => "/order/month-sales-summary",
      providesTags: ["sales"],
    }),
    getRecentOrders: builder.query({
      query: () => "/order/recent-orders",
      providesTags: ["sales"],
    }),
  }),
});

export const { 
  useGetLastMonthSalesSummaryQuery,
  useGetRecentOrdersQuery 
} = salesApi;
