
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';






export const searchUserApiRtk = createApi({

  reducerPath: "api",

  baseQuery: fetchBaseQuery({

    baseUrl: "http://localhost:2024/api/v1/hellosocial/user",
    credentials: 'include'

  }),

  endpoints: (builder) => ({
    searchUsers: builder.query({
      query: (nameBeingSearched) => `/searchingusers/?username=${nameBeingSearched}`,

    }),
  })
})

export const { useLazySearchUsersQuery } = searchUserApiRtk;











