import React from "react";
interface ArgumentsFormProps {
  // TODO: Operator type missing
  // TODO: Create enum
  types: ("string" | "boolean" | "number")[];
  values: (string | boolean | number)[];
  names: string[];
  onChange: Function
}

const convertUsingType = (typeName: string, value: string) => {
  switch (typeName) {
  case "number":
    return +value;
  case "string":
    return value;
  case "boolean":
    return !!value;
  default:
    throw new Error("Invalid type name");
  }
};

export const ArgumentsForm = ({ types, onChange, values, names }: ArgumentsFormProps) => {
  const onChangeHandler = (idx: number, value: any) => {
    const newValues = [...values];
    newValues[idx] = convertUsingType(types[idx], value);
    onChange(newValues);
  };

  // TODO: Improve the inputs (must support all types)
  // TODO: Not sure about the "as string" in the value property. But I think the input converts numbers.
  //       Booleans have to be handled differently.
  // TODO: Argument names are missing.
  return (
    <div>
      { types.map((type: string, idx: number) => (
        <div key={ idx }>
          <input type={ types[idx] === "number" ? "number" : "text" }
            placeholder={ `${type} | ${names[idx]}` }
            value={ (values[idx] || "") as string }
            onChange={ (ev) => onChangeHandler(idx, ev.currentTarget.value) } />
        </div>
      )) }
    </div>
  );
};
