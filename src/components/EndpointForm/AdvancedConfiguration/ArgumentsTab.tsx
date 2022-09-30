import Tippy from "@tippyjs/react";
import React, { useContext } from "react";
import { Input } from "./Input";
import { EndpointFormContext, EndpointFormDispatchContext } from "../../../contexts/EndpointFormContext";
import { convertUsingType, getSanitizedArgs } from "../../../util/endpoint";
import { PairLabelValueCols } from "../../PairLabelValueCols";
import rulesArgs from "../rules-arguments.json";
import "tippy.js/dist/tippy.css"; // optional

export type ArgumentType = "string" | "boolean" | "number" | "comparisonOperator";

interface ArgumentsFormProps {
  types: ArgumentType[];
  values: (string | boolean | number)[];
  names: string[];
  onChange: (a: (string | boolean | number)[]) => void;
  argDescriptions: string[];
}

const ArgumentsForm = ({ types, onChange, values, names, argDescriptions }: ArgumentsFormProps) => {
  const onChangeHandler = (idx: number, value: string) => {
    const newValues = [...values];
    newValues[idx] = convertUsingType(types[idx], value);
    onChange(newValues);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      { types.map((type: string, idx: number) => {
        const input = (
          <div className="w-full">
            <Input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type={ types[idx] }
              placeholder={ `${type} | ${names[idx]}` }
              value={ values[idx] }
              onChange={ (ev) => onChangeHandler(idx, (ev.currentTarget as HTMLInputElement).value) } />
          </div>
        );

        return (
          <PairLabelValueCols
            key={ idx }
            left={ (
              <Tippy content={ <span>{ argDescriptions[idx] }</span> }>
                <span>{ names[idx] }</span>
              </Tippy>
            ) }
            right={ input } />
        );
      }) }
    </div>
  );
};

export const ArgumentsTab = () => {
  const dispatch = useContext(EndpointFormDispatchContext);
  const endpoint = useContext(EndpointFormContext);

  return (
    <>
      <div className="text-slate-100 mt-4 mb-8 text-sm">
        Configure what to do with the data once it&apos;s fetched.
      </div>

      <ArgumentsForm
        values={ getSanitizedArgs(endpoint) }
        names={ rulesArgs.names[endpoint.rule] }
        onChange={ (payload: (string | number | boolean)[]) => dispatch({ payload, type: "set_args" }) }
        argDescriptions={ rulesArgs.descriptions[endpoint.rule] }
        types={ rulesArgs.types[endpoint.rule] } />
    </>
  );
};
