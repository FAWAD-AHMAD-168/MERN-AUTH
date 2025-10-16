import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: "https://mern-auth-p51s.onrender.com/api/user" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    userData: builder.query({
      query: () => ({
        url: "/user-data",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),


   

      
  }),
});

export const {
    useUserDataQuery
  
  
} = userApi;

export default userApi;
