import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PollingsPaginatedResult } from "../components/PollingsTable";
import { API_HOST, API_PORT } from "../config";

interface PaginatedQuery {
  id: number | undefined;
  page: number;
  pageSize: number;
  order: "asc" | "desc";
  sortBy: string
}

export const pollingsSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_HOST}:${API_PORT}/pollings` }),
  endpoints: (builder) => ({
    findPollings: builder.query<PollingsPaginatedResult, PaginatedQuery>({
      query: ({ id, page, pageSize, sortBy, order }: PaginatedQuery) => ({
        url: id ? `/${id}` : "/",
        params: {
          page,
          pageSize,
          sortBy,
          order
        }
      })
    })
  }),
  reducerPath: "pollingsSlice"
});

export const { useFindPollingsQuery } = pollingsSlice;
