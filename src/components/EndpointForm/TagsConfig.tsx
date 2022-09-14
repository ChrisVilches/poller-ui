import { Set } from "immutable";
import React from "react";
import { Tag } from "../../models/Tag";
import { useFindAllTagsQuery } from "../../slices/tagSlice";
import { TagLabel } from "../TagLabel";

interface TagsConfigProps {
  selectedTagIds: Set<number>;
  onSelectedTagIdsChange: (ids: Set<number>) => void;
}

// TODO: Should use a localization library.
const tagsSelectedLabel = (count: number) => {
  switch(count){
  case 0:
    return "No tags selected.";
  case 1:
    return "One tag selected.";
  default:
    return `${count} tags selected.`;
  }
};

export const TagsConfig = ({ selectedTagIds, onSelectedTagIdsChange }: TagsConfigProps) => {
  const { data: allTags = [] } = useFindAllTagsQuery();

  const toggleSelectTag = (tagId: number) => {
    onSelectedTagIdsChange(selectedTagIds.has(tagId) ? selectedTagIds.remove(tagId) : selectedTagIds.add(tagId));
  };

  return (
    <div className="mb-2">
      { allTags.map((tag: Tag) => (
        <button key={ tag.id } className="mr-2" onClick={ () => toggleSelectTag(tag.id) }>
          <div
            className={ `${selectedTagIds.has(tag.id) ? "bg-slate-800 font-bold" : "bg-slate-400"} text-slate-100
            rounded-md px-2 select-none text-sm` }>
            <TagLabel name={ tag.name }/>
          </div>
        </button>
      )) }

      <div className="text-slate-100 mt-4 mb-8 text-sm">
        { tagsSelectedLabel(selectedTagIds.size) }
      </div>
    </div>
  );
};
