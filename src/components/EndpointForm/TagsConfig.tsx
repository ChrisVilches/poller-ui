import { Set } from "immutable";
import React, { useEffect, useState } from "react";
import { Endpoint } from "../../models/Endpoint";
import { Tag } from "../../models/Tag";
import { useEndpointTagsQuery } from "../../slices/endpointSlice";
import { useFindAllQuery } from "../../slices/tagSlice";

interface TagsConfigProps {
  endpoint: Endpoint;
  onSelectedTagIdsChange: (ids: Set<number>) => void;
}

export const TagsConfig = ({ endpoint, onSelectedTagIdsChange }: TagsConfigProps) => {
  const [selectedTagIds, setSelectedTagIds] = useState(Set<number>());

  const { data: allTags = [], isLoading: allLoading } = useFindAllQuery();

  const { data: endpointTags = [], refetch, isFetching, fulfilledTimeStamp } = useEndpointTagsQuery(endpoint.id, {
    skip: !endpoint.id
  });

  useEffect(() => {
    setSelectedTagIds(Set(endpointTags.map((t: Tag) => t.id)));
  }, [fulfilledTimeStamp, endpointTags]);

  useEffect(() => {
    console.log("refetching, endpoint ID", endpoint.id);
    refetch();
  }, [endpoint.id, refetch]);

  useEffect(() => {
    onSelectedTagIdsChange(selectedTagIds);
  }, [selectedTagIds, onSelectedTagIdsChange]);

  const toggleSelectTag = (tagId: number) => {

    setSelectedTagIds((state: Set<number>) =>
      state.has(tagId) ? state.remove(tagId) : state.add(tagId));
  };

  if(allLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-x-2 mb-2">
      { allTags.map((tag: Tag) => (
        <button key={ tag.id } onClick={ () => toggleSelectTag(tag.id) }>
          <span className={ `${selectedTagIds.has(tag.id) ? "bg-slate-400" : "bg-slate-300"} text-white rounded-md p-2 unselectable` }>
            { tag.name }
          </span>
        </button>
      )) }
    </div>
  );
};
