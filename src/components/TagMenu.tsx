import React from "react";
import { Link, useMatch } from "react-router-dom";
import { CreateTag } from "./CreateTag";
import { Spinner } from "./Spinner";
import { TagLabel } from "./TagLabel";
import { Tag } from "../models/Tag";
import { useFindAllTagsQuery } from "../slices/tagSlice";

export const TagMenu = () => {
  const { data: tags, isLoading, isFetching } = useFindAllTagsQuery();

  const match = useMatch("/tag/:id");

  const activeTagId = Number(match?.params?.id);

  if (isLoading) {
    return (
      <div role="status" className="max-w-sm animate-pulse">
        <div className="h-7 bg-slate-700 rounded-full w-3/4 mb-4"></div>
        <div className="h-7 bg-slate-700 rounded-full w-full mb-2.5"></div>
        <div className="h-7 bg-slate-700 rounded-full mb-2.5"></div>
        <div className="h-7 bg-slate-700 rounded-full w-2/4 mb-2.5"></div>
        <div className="h-7 bg-slate-700 rounded-full w-3/4 mb-2.5"></div>
        <div className="h-7 bg-slate-700 rounded-full w-full"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <Link className="tag-button" to="/">
        <div className="my-1 flex items-center p-2">
          <div className="grow">
            All
          </div>
          <div style={ { visibility: isFetching ? "visible" : "hidden" } }>
            <Spinner/>
          </div>
        </div>
      </Link>
      { (tags || []).map((t: Tag) => (
        <div key={ t.id }>
          <Link className={ `tag-button ${activeTagId === t.id ? "tag-button-active" : ""}` }
            to={ `tag/${t.id}` }>
            <div className="px-2">
              <TagLabel name={ t.name } count={ t.endpointsCount || 0 }/>
            </div>
          </Link>
        </div>
      )) }

      <div className="mt-4">
        <CreateTag/>
      </div>
    </div>
  );
};
