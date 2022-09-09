import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tag } from "../models/Tag";

export const endpointSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/endpoints" }),
  endpoints: (builder) => ({
    endpointTags: builder.query<Tag[], number>({
      query: (id: number) => `/${id}/tags`
    })
  }),
  reducerPath: "endpointSlice"
});

export const { useEndpointTagsQuery } = endpointSlice;
