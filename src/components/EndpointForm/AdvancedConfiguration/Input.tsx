import React, { ChangeEventHandler } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string | boolean | number;
  onChange: ChangeEventHandler;
  className?: string;
}

const options = [
  ["=", "=="],
  ["<", "<"],
  [">", ">"],
  ["≥", ">="],
  ["≤", "<="]
];

export const Input = ({ className = "", type, placeholder, value, onChange }: InputProps) => {
  if (type === "number") {
    return (
      <input className={ className }
        type="number"
        placeholder={ placeholder }
        value={ value as string || 0 }
        onChange={ onChange }/>
    );
  }

  if (type === "string") {
    return (
      <input className={ className }
        type="text"
        placeholder={ placeholder }
        value={ value as string || "" }
        onChange={ onChange }/>
    );
  }

  if (type === "comparisonOperator") {
    return (
      <select className={ className } value={ value as string } onChange={ onChange }>
        { options.map(([display, value], idx: number) => (
          <option key={ idx } value={ value }>{ display }</option>
        )) }
      </select>
    );
  }

  throw new Error(`Invalid operator type (${type})`);
};
