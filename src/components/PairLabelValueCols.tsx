import React from "react";

interface PairLabelValueColsProps {
  left: React.ReactNode;
  right: React.ReactNode;
  smallScreenCenterItems?: boolean;
}

// TODO: This only works well when the container has a specific set of CSS classes
//       (e.g. grid, etc)
//
//       Find a way to solve this. For example, force the user (somehow) to use the correct
//       container, etc.
export const PairLabelValueCols = ({ left, right, smallScreenCenterItems: center = false }: PairLabelValueColsProps) => (
  <>
    <div className={`text-slate-300 flex ${center ? "justify-center" : ""} items-center md:justify-end`}>
      { left }
    </div>
    <div className={`text-slate-200 font-semibold flex ${center ? "justify-center" : ""} md:justify-start`}>
      { right }
    </div>
  </>
);
