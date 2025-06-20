import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const baseUrl= "https://emedicine.vercel.app/api/v1"
// export const baseUrl = "http://localhost:5000/api/v1";


const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://emedicine.vercel.app/api/v1";
  } else {
    return "http://localhost:5001/api/v1";
  }
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
  }),

  tagTypes: ["products", "name", "price", "data", "productRequests", "sales"],


  endpoints: () => ({}),
});
