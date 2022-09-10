import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Endpoint } from "../models/Endpoint";
import { Tag } from "../models/Tag";

export const endpointSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/endpoints" }),
  endpoints: (builder) => ({
    endpointTags: builder.query<Tag[], number>({
      query: (id: number) => `/${id}/tags`
    }),
    findAll: builder.query<Endpoint[], void>({
      query: () => "/"
    })
  }),
  reducerPath: "endpointSlice"
});

export const { useFindAllQuery, useEndpointTagsQuery } = endpointSlice;
