import { HashtagIcon } from "@heroicons/react/24/outline";
import React from "react";
import { CircleCount } from "./CircleCount";

interface TagLabelProps {
  name: string;
  count?: number;
}

export const TagLabel = ({ name, count }: TagLabelProps) => (
  <div className="my-1 flex items-center py-2">
    <HashtagIcon className="w-4 h-4 mr-2" />
    <div className="overflow-hidden whitespace-nowrap overflow-ellipsis">
      { name }
    </div>

    { typeof count === "number" ? (
      <CircleCount className="ml-4 tag-label-count" count={ count }/>
    ) : <></> }
  </div>
);
