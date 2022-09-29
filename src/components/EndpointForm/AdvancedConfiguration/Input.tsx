import React, { ChangeEventHandler } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string | boolean | number;
  onChange: ChangeEventHandler;
  className?: string;
}

export const Input = ({ className = "", type, placeholder, value, onChange }: InputProps) => {

  if(type === "number") {
    return (
      <input className={ className }
        type="number"
        placeholder={ placeholder }
        value={ value as string || 0 }
        onChange={ onChange }/>
    );
  }

  if(type === "string") {
    return (
      <input className={ className }
        type="text"
        placeholder={ placeholder }
        value={ value as string || "" }
        onChange={ onChange }/>
    );
  }

  if(type === "comparisonOperator") {
    const options = [
      // TODO: Consider removing the first empty option, and set the first option as default
      //       (HTML does this by default), but also make sure that the state (in React) is set
      //       accordingly as well (HTML Select option = React state during the default initialization)
      ["", ""],
      ["=", "=="],
      ["<", "<"],
      [">", ">"],
      ["≥", ">="],
      ["≤", "<="]
    ];
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
