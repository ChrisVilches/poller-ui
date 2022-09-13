import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_HOST, API_PORT } from "../config";
import { Tag } from "../models/Tag";

export const tagSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_HOST}:${API_PORT}/tags` }),
  endpoints: (builder) => ({
    createTag: builder.mutation<Tag, string>({
      query: (name: string) => ({
        url: "/",
        method: "post",
        body: { name }
      }),
      onQueryStarted(name: string, { dispatch, queryFulfilled }) {
        const postResult = dispatch(
          tagSlice.util.updateQueryData("findAllTags", undefined, draft => {
            draft.push({
              id: 0,
              name
            } as Tag);
          })
        );
        queryFulfilled.catch(postResult.undo);
      },
      async onCacheEntryAdded(_arg: string, { cacheDataLoaded, dispatch }) {
        const tag: Tag = (await cacheDataLoaded).data;
        dispatch(tagSlice.util.updateQueryData("findAllTags", undefined, draft => {
          draft[draft.length - 1] = tag;
        }));
      }
    }),
    findAllTags: builder.query<Tag[], void>({
      query: () => "/"
    }),
    findOneTag: builder.query<Tag, number>({
      query: (id: number) => `/${id}`
    })
  }),
  reducerPath: "tagSlice"
});

export const { useCreateTagMutation, useFindAllTagsQuery, useFindOneTagQuery } = tagSlice;
