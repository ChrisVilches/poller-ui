import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINT } from "../config";
import { Tag } from "../models/Tag";

export const tagSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${API_ENDPOINT}/tags` }),
  endpoints: (builder) => ({
    createTag: builder.mutation<Tag, string>({
      async onCacheEntryAdded(_arg: string, { cacheDataLoaded, dispatch }) {
        const tag: Tag = (await cacheDataLoaded).data;
        dispatch(tagSlice.util.updateQueryData("findAllTags", undefined, draft => {
          draft[draft.length - 1] = tag;
        }));
      },
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
      query: (name: string) => ({
        body: { name },
        method: "post",
        url: "/"
      })
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
