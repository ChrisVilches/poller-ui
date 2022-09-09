import React from "react";
import { Tag } from "../models/Tag";
import { useFindAllQuery } from "../slices/tagSlice";

export const TagMenu = () => {
  const { data, isFetching, isLoading } = useFindAllQuery();

  if(isLoading) {
    return <div>Loading (RTK Query)</div>;
  }

  return (
    <div>
      { isFetching ? "Fetching..." : "" }
      { (data || []).map((t: Tag) => (
        <div key={ t.id }>
          { t.name } - { t.endpointsCount }
        </div>
      )) }
    </div>
  );
};
