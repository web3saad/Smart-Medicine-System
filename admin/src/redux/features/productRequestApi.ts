import { api } from "../api/apiSlice";

const productRequestApi = api.injectEndpoints({
 endpoints: (builder) => ({
  getAllProductRequests: builder.query({
    query: () => "/productRequest/all/admin", // Update the endpoint URL
    providesTags: ["productRequests"],
  }),
}),
});

export const { useGetAllProductRequestsQuery } = productRequestApi;
