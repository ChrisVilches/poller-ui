import React from "react";

interface PairLabelValueColsProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const PairLabelValueCols = ({ left, right }: PairLabelValueColsProps) => (
  <>
    <div className="text-slate-300 md:text-right">{ left }</div>
    <div className="text-slate-200 md:text-left font-semibold">{ right }</div>
  </>
);
