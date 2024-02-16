import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

axios.defaults.withCredentials = true;

export const loginUserApiRtk = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2024/api/v1/hellosocial/user",
   credentials:'include'
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (input) => ({
        url: "/login",
        method: "POST",
        body: input
      })
    })
  })
});

export const { useLoginUserMutation } = loginUserApiRtk;
