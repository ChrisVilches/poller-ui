import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { MouseEventHandler } from "react";

export const SmallCancelButton = ({ onClick }: { onClick: MouseEventHandler }) => (
  <button type="button" onClick={ onClick } className="bg-slate-200 p-2 rounded-full">
    <XMarkIcon className="w-5 h-5 text-black"/>
  </button>
);
