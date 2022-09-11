import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tag } from "../models/Tag";

export const tagSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/tags" }),
  endpoints: (builder) => ({
    findAllTags: builder.query<Tag[], void>({
      query: () => "/"
    }),
    findOneTag: builder.query<Tag, number>({
      query: (id: number) => `/${id}`
    })
  }),
  reducerPath: "tagSlice"
});

export const { useFindAllTagsQuery, useFindOneTagQuery } = tagSlice;
