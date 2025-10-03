import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Auth'], 
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Register mutation
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

        // verify-otp
    verifyotp: builder.mutation({
      query: (data) => ({
        url: 'auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),


    resendOtp: builder.mutation({
      query: (data) => ({
        url: 'auth/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),

  }),
})

export const { useLoginMutation, useRegisterMutation ,useVerifyotpMutation ,useResendOtpMutation} = authApi

export default authApi
