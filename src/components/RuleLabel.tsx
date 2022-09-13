import React from "react";

interface RuleLabelProps {
  label: string;
  bold?: boolean
}

export const RuleLabel = ({ label, bold = false }: RuleLabelProps) => {
  const colors = {
    ContentEqualsRule: {
      bold: "bg-violet-700 font-bold",
      normal: "bg-violet-500"
    },
    HasOccurrencesRule: {
      bold: "bg-green-700 font-bold",
      normal: "bg-green-500"
    }
  };

  const bgClass = colors[label][bold ? "bold" : "normal"];

  return (
    <>
      <div className={ `${bgClass} rounded-md text-white inline-block text-sm p-2 select-none` }>
        { label }
      </div>
    </>
  );
};
