
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 

export const aboutUserApiRtk = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:2024/api/v1/hellosocial/user",
   credentials:'include'
  }),
        endpoints: (builder) => ({
            aboutUser: builder.query({
              query: (userId) => `/aboutuser/${userId}`,
        
      
        }),

    })
})

export const {useLazyAboutUserQuery} = aboutUserApiRtk;


