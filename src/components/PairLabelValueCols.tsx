import React from "react";

interface PairLabelValueColsProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const PairLabelValueCols = ({ left, right }: PairLabelValueColsProps) => (
  <>
    <div className="text-slate-600 md:text-right">{ left }</div>
    <div className="text-slate-600 md:text-left">{ right }</div>
  </>
);
