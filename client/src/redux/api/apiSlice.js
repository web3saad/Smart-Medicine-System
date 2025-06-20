import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  // Change baseUrl to local backend for development
  export const baseUrl= "http://localhost:5001/api/v1"
  //  export const baseUrl= "https://emedicine.vercel.app/api/v1"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),

  tagTypes: ["address", "phone", "email", "data"],

  endpoints: () => ({}),
});
