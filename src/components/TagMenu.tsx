import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "../models/Tag";
import { useFindAllQuery } from "../slices/tagSlice";

export const TagMenu = () => {
  const { data, isFetching } = useFindAllQuery();

  if(isFetching) {
    return <div>Loading (RTK Query)</div>;
  }

  return (
    <div>
      <Link to="/">
        All
      </Link>
      { (data || []).map((t: Tag) => (
        <div key={ t.id }>
          <Link to={`tag/${t.id}`}>
            { t.name } - { t.endpointsCount }
          </Link>
        </div>
      )) }
    </div>
  );
};
