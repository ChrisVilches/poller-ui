import { HashtagIcon } from "@heroicons/react/24/outline";
import React from "react";

interface TagLabelProps {
  name: string;
  count?: number;
}

export const TagLabel = ({ name, count }: TagLabelProps) => {

  return (
    <div className="my-1">
      <HashtagIcon className="inline-block w-4 h-4 m-2"/>
      { name }

      { typeof count === "number" ? (
        <div className="inline-block bg-slate-700 rounded-full ml-3 px-2 text-sm">
          { count }
        </div>
      ) : <></> }
    </div>
  );
};
