import React, { ChangeEventHandler } from "react";

export type ArgumentType = "string" | "boolean" | "number" | "comparisonOperator";

interface ArgumentsFormProps {
  types: ArgumentType[];
  values: (string | boolean | number)[];
  names: string[];
  onChange: Function
  argDescriptions: string[];
}

const convertUsingType = (typeName: string, value: string) => {
  switch (typeName) {
  case "number":
    return +value;
  case "string":
    return value;
  case "boolean":
    return !!value;
  case "comparisonOperator":
    return value;
  default:
    throw new Error(`Invalid type name (${typeName})`);
  }
};

interface InputProps {
  type: string;
  placeholder: string;
  value: string | boolean | number;
  onChange: ChangeEventHandler;
}

export const Input = ({ type, placeholder, value, onChange }: InputProps) => {

  if(type === "number") {
    return <input type="number" placeholder={ placeholder } value={ value as string } onChange={ onChange }/>;
  }

  if(type === "string") {
    return <input type="text" placeholder={ placeholder } value={ value as string } onChange={ onChange }/>;
  }

  if(type === "comparisonOperator") {
    const options = [
      ["=", "=="],
      ["<", "<"],
      [">", ">"],
      ["≥", ">="],
      ["≤", "<="]
    ];
    return (
      <select value={ value as string } onChange={ onChange }>
        { options.map(([display, value], idx: number) => (
          <option key={ idx } value={ value }>{ display }</option>
        )) }
      </select>
    );
  }

  throw new Error(`Invalid operator type (${type})`);
};

export const ArgumentsForm = ({ types, onChange, values, names, argDescriptions }: ArgumentsFormProps) => {
  const onChangeHandler = (idx: number, value: any) => {
    const newValues = [...values];
    newValues[idx] = convertUsingType(types[idx], value);
    onChange(newValues);
  };

  // TODO: Last argument (for the rule that requires 3) is not being saved, I think.
  // TODO: I get the "A component is changing a controlled input to be uncontrolled" sometimes.
  //       (I just got it after updating an endpoint, and then creating a new one.)
  //       Also, in this error reproduction, the new endpoint has the same arguments as the previous one.
  //
  // TODO: I think sometimes the arguments from an endpoint disappear randomly (don't know the cause).

  return (
    <div>
      { types.map((type: string, idx: number) => (
        <div key={ idx }>
          <b>{ names[idx] }:</b>
          <span>{ argDescriptions[idx] }</span>
          <Input
            type={ types[idx] }
            placeholder={ `${type} | ${names[idx]}` }
            value={ values[idx] }
            onChange={ (ev) => onChangeHandler(idx, (ev.currentTarget as HTMLInputElement).value) }/>
        </div>
      )) }
    </div>
  );
};
