import React, { useContext } from "react";
import { EndpointFormContext, EndpointFormDispatchContext } from "../../../contexts/EndpointFormContext";
import { Tag } from "../../../models/Tag";
import { useFindAllTagsQuery } from "../../../slices/tagSlice";
import { TagLabel } from "../../TagLabel";

const tagsSelectedLabel = (count: number) => {
  switch (count){
  case 0:
    return "No tags selected.";
  case 1:
    return "One tag selected.";
  default:
    return `${count} tags selected.`;
  }
};

export const TagsTab = () => {
  const dispatch = useContext(EndpointFormDispatchContext);
  const endpoint = useContext(EndpointFormContext);
  const { data: allTags = [] } = useFindAllTagsQuery();

  const toggleSelectTag = (tagId: number) => {
    dispatch({ payload: tagId, type: "toggle_tag_id" });
  };

  return (
    <div className="mb-2">
      { allTags.map((tag: Tag) => (
        <button key={ tag.id } className="mr-2" onClick={ () => toggleSelectTag(tag.id) }>
          <div
            className={ `${endpoint.tagIds.has(tag.id) ? "bg-slate-800 font-bold" : "bg-slate-400"} text-slate-100
            rounded-md px-2 select-none text-sm` }>
            <TagLabel name={ tag.name }/>
          </div>
        </button>
      )) }

      <div className="text-slate-100 mt-4 mb-8 text-sm">
        { tagsSelectedLabel(endpoint.tagIds.size) }
      </div>
    </div>
  );
};
