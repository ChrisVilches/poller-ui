import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "../config";
import { Polling } from "../models/Polling";

interface PollingsPaginatedResult {
  count: number;
  data: Polling[];
}

interface PaginatedQuery {
  id: number | undefined;
  page: number;
  pageSize: number;
  order: "asc" | "desc";
  sortBy: string;
}

export const pollingsSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_ENDPOINT}/pollings` }),
  endpoints: (builder) => ({
    findPollings: builder.query<PollingsPaginatedResult, PaginatedQuery>({
      query: ({ id, page, pageSize, sortBy, order }: PaginatedQuery) => ({
        params: {
          order,
          page,
          pageSize,
          sortBy
        },
        url: id ? `/${id}` : "/"
      })
    })
  }),
  reducerPath: "pollingsSlice"
});

export const { useFindPollingsQuery } = pollingsSlice;
