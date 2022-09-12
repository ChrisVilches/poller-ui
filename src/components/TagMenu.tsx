import React from "react";
import { Link } from "react-router-dom";
import { CreateTag } from "./CreateTag";
import { Tag } from "../models/Tag";
import { useFindAllTagsQuery } from "../slices/tagSlice";

export const TagMenu = () => {
  const { data: tags, isLoading, isFetching } = useFindAllTagsQuery();

  if(isLoading) {
    return <div>Loading (RTK Query)</div>;
  }

  return (
    <div>
      <Link to="/">
        All { isFetching ? "(fetching...)" : "" }
      </Link>
      { (tags || []).map((t: Tag) => (
        <div key={ t.id }>
          <Link to={ `tag/${t.id}` }>
            { t.name } - { t.endpointsCount }
          </Link>
        </div>
      )) }
      <CreateTag/>
    </div>
  );
};
