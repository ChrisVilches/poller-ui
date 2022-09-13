import React from "react";

interface RuleDescriptionProps {
  ruleName: string;
}

export const RuleDescription = ({ ruleName }: RuleDescriptionProps) => {
  switch (ruleName) {
  case "ContentEqualsRule":
    return (
      <i>
        This rule checks exact content.
      </i>
    );
  case "HasOccurrencesRule":
    return (
      <i>
        This rule counts the occurrences of a string.
      </i>
    );
  default:
    throw new Error(`Invalid rule name (${ruleName})`);
  }
};
