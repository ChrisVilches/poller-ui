import { Spinner } from "flowbite-react";
import React from "react";
import { Link, useMatch } from "react-router-dom";
import { CreateTag } from "./CreateTag";
import { TagLabel } from "./TagLabel";
import { Tag } from "../models/Tag";
import { useFindAllTagsQuery } from "../slices/tagSlice";

export const TagMenu = () => {
  const { data: tags, isLoading, isFetching } = useFindAllTagsQuery();

  const match = useMatch("/tag/:id") || {} as any;

  const activeTagId = +match.params?.id;
  
  if(isLoading) {
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
        <span className="p-2 m-2">
          All { isFetching ? <div className="float-right pr-2"><Spinner/></div> : "" }
        </span>
      </Link>
      { (tags || []).map((t: Tag) => (
        <div key={ t.id }>
          <Link className={ `tag-button ${activeTagId === t.id ? "tag-button-active" : ""}` }
            to={ `tag/${t.id}` }>
            <TagLabel name={ t.name } count={ t.endpointsCount || 0 }/>
          </Link>
        </div>
      )) }

      <div className="mt-4">
        <CreateTag/>
      </div>
    </div>
  );
};
