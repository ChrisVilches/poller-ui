import React, { ChangeEventHandler } from "react";
import { PairLabelValueCols } from "../PairLabelValueCols";

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
  className?: string;
}

export const Input = ({ className, type, placeholder, value, onChange }: InputProps) => {

  if(type === "number") {
    return <input className={className} type="number" placeholder={ placeholder } value={ value as string || 0 } onChange={ onChange }/>;
  }

  if(type === "string") {
    return <input className={className} type="text" placeholder={ placeholder } value={ value as string || "" } onChange={ onChange }/>;
  }

  if(type === "comparisonOperator") {
    const options = [
      ["", ""],
      ["=", "=="],
      ["<", "<"],
      [">", ">"],
      ["≥", ">="],
      ["≤", "<="]
    ];
    return (
      <select className={className} value={ value as string } onChange={ onChange }>
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
  //       ^ It's because the <select> shows by default a value (first <option>) even if
  //         it's not set as "state" (React-wise). So, make sure the option shown corresponds
  //         to the state as well (they are in sync).
  //
  // TODO: I get the "A component is changing a controlled input to be uncontrolled" sometimes.
  //       (I just got it after updating an endpoint, and then creating a new one.)
  //       Also, in this error reproduction, the new endpoint has the same arguments as the previous one.
  //       ^ First error is because of some null or undefined values in the value (I think, but I
  //         already fixed it). Second error is because of the first error, so both are fixed.
  //         Must confirm.
  //
  // TODO: I think sometimes the arguments from an endpoint disappear randomly (don't know the cause).
  //       Possibly it's related to the first TODO, but I'm not sure. I haven't reproduced anything like
  //       this recently.

  //
  // I'd say all of these errors are fixed now (note: some fixes are not fully implemented, so confirm),
  // but do some more monkey testing to verify.

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
      { types.map((type: string, idx: number) => {
        const input = (
          <div className="w-full">
            <Input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type={types[idx]}
              placeholder={`${type} | ${names[idx]}`}
              value={values[idx]}
              onChange={(ev) => onChangeHandler(idx, (ev.currentTarget as HTMLInputElement).value)} />
          </div>
        )

        return (
          <PairLabelValueCols
            key={idx}
            left={names[idx]}
            right={input} />
        )
      }) }
    </div>
  );
};
