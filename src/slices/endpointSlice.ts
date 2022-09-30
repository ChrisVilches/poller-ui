import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "../config";
import { Endpoint } from "../models/Endpoint";
import { Tag } from "../models/Tag";

export const endpointSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_ENDPOINT}/endpoints` }),
  endpoints: (builder) => ({
    endpointTags: builder.query<Tag[], number>({
      query: (id: number) => `/${id}/tags`
    }),
    findAllEndpoints: builder.query<Endpoint[], void>({
      query: () => "/"
    }),
    findOneEndpoint: builder.query<Endpoint, number>({
      query: (id: number) => `/${id}`
    })
  }),
  reducerPath: "endpointSlice"
});

export const { useFindAllEndpointsQuery, useEndpointTagsQuery, useFindOneEndpointQuery } = endpointSlice;
