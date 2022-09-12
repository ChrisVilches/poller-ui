import React from "react";

interface RuleDescriptionProps {
  ruleName: string;
}

export const RuleDescription = ({ ruleName }: RuleDescriptionProps) => {
  switch (ruleName) {
  case "ContentEqualsRule":
    return (
      <div>
        This rule checks exact content.
      </div>
    );
  case "HasOccurrencesRule":
    return (
      <div>
        This rule counts the occurrences of a string.
      </div>
    );
  default:
    throw new Error(`Invalid rule name (${ruleName})`);
  }
};
