import React from "react";

interface RuleDescriptionProps {
  ruleName: string;
}

// TODO: These texts can be moved to a JSON file.
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
  case "AlwaysRule":
    return (
      <i>
        Always evaluates to true.
      </i>
    );
  default:
    throw new Error(`Invalid rule name (${ruleName})`);
  }
};
