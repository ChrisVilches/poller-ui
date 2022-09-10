import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Polling } from "../models/Polling";

export const pollingsSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/pollings" }),
  endpoints: (builder) => ({
    findPollings: builder.query<Polling[], number | undefined>({
      query: (id: number | undefined) => id ? `/${id}` : "/"
    })
  }),
  reducerPath: "pollingsSlice"
});

export const { useFindPollingsQuery } = pollingsSlice;
