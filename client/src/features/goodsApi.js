// @ts-nocheck
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import axios from "axios";

export const dataApi = createApi({
  reducerPath: 'dataApi',
  tagTypes: ['getPostsApi'],
  baseQuery: 
  fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api/`,
  }),
  endpoints: (build) => ({
    getData: build.query({
      queryFn: async({cat = '', countresult = '', currentpage = ''}) => {
          try {
            if (cat !== '' && cat !== undefined) {
              cat = cat.split('=')[1];
            }
            if (currentpage !== null) {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts?currentpage=${currentpage}&cat=${cat}&countresult=${countresult}`)
                return {data: res.data};
            } 
            else {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts?currentpage=${0}&cat=${cat}`)
                return {data: res.data};
            }
          } catch (error) {
            return {error: error.message};
          }
      },
      providesTags:
        (result) => result
          ? [
              ...result.data.map(({ id }) => ({ type: 'getPostsApi', id })),
              { type: 'getPostsApi', id: 'POST' },
            ]
          : [{ type: 'getPostsApi', id: 'POST' }],
    }),
    getCategegoryData: build.query({
      queryFn: async({cat = '', currentpage = ''}) => {
        try {
          if (currentpage !== null && currentpage >= 0  && cat !== '' && cat !== undefined) {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts?currentpage=${currentpage}&cat=${cat}`)
            return {data: res.data}
          } else {
            return {data: []}
          }
        } catch (error) {
          return {error: error.message}
        }
      },
      invalidatesTags: [{ type: 'getPostsApi', id: 'POST' }]
    }),
    updateData: build.mutation({
      queryFn: async({cat = '', countresult = '', currentpage = ''}) => {
        try {
          if (cat !== '' && cat !== undefined) {
            cat = cat.split('=')[1];
          }
          if (currentpage !== null) {
              const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts?currentpage=${currentpage}&cat=${cat}&countresult=${countresult}`)
              return {data: res.data};
          } 
          else {
              const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts?currentpage=${0}&cat=${cat}`)
              return {data: res.data};
          }
        } catch (error) {
          return {error: error.message};
        }
      },
      invalidatesTags: [{ type: 'getPostsApi', id: 'POST' }]
    }),
  })
});

export const {useGetDataQuery, useGetCategegoryDataQuery, useUpdateDataMutation} = dataApi;
