import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tag } from "../models/Tag";

export const tagSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/tags" }),
  endpoints: (builder) => ({
    findAll: builder.query<Tag[], void>({
      query: () => "/"
    })
  }),
  reducerPath: "tagSlice"
});

export const { useFindAllQuery } = tagSlice;
