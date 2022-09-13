import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST, API_PORT } from "../config";
import { Endpoint } from "../models/Endpoint";
import { Tag } from "../models/Tag";

export const endpointSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_HOST}:${API_PORT}/endpoints` }),
  endpoints: (builder) => ({
    endpointTags: builder.query<Tag[], number>({
      query: (id: number) => `/${id}/tags`
    }),
    findAllEndpoints: builder.query<Endpoint[], void>({
      query: () => "/"
    }),
    // TODO: This query is meant to be used for the pollings view, but what would happen
    //       if it's called somewhere else? There's a chance the previously loaded
    //       endpoint would appear for a moment. Maybe refactor and call it
    //       something like "endpoint selected for polling view" (but choose a more compact name).
    findOneEndpoint: builder.query<Endpoint, number>({
      query: (id: number) => `/${id}`
    })
  }),
  reducerPath: "endpointSlice"
});

export const { useFindAllEndpointsQuery, useEndpointTagsQuery, useFindOneEndpointQuery } = endpointSlice;
