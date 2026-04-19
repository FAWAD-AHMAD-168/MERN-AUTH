import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/",
    credentials: "include", 
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    userData: builder.query({
      query: () => ({
        url: "/user/user-data",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useUserDataQuery } = userApi;
export default userApi;