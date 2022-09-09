import React from "react";

interface RuleLabelProps {
  label: string;
  bold?: boolean
}

export const RuleLabel = ({ label, bold = false }: RuleLabelProps) => {
  const colors = {
    ContentEqualsRule: {
      bold: "bg-violet-500",
      normal: "bg-violet-300"
    },
    HasOccurrencesRule: {
      bold: "bg-blue-500",
      normal: "bg-blue-300"
    }
  };

  const bgClass = colors[label][bold ? "bold" : "normal"];

  return (
    <>
      <div className={ `${bgClass} rounded-md text-white inline-block text-sm p-2 unselectable` }>
        { label }
      </div>
    </>
  );
};
