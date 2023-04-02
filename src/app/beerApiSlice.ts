import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Beer } from './types'


export const beerApi = createApi({
  reducerPath: 'beerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.punkapi.com/v2/' }),
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getBeers: builder.query<Array<Beer>,number|void>({
      query: (page) => `beers?page=${page}&per_page=12`,
    }),
    getBeerById: builder.query<Beer, string>({
        query: (id) => `beers/${id}`,
        transformResponse: (response: Array<Beer>, meta, arg) => response[0],
      }),
  }),
})

export const { useGetBeersQuery, useGetBeerByIdQuery } = beerApi