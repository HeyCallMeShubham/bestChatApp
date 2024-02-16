
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 

export const registerUserApiRtk = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2024/api/v1/hellosocial/user",
   credentials:'include'
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (input) => ({
        url: "/register",
        method: "POST",
        body: input
      })
    })
  })
});


export const { useRegisterUserMutation } = registerUserApiRtk;









