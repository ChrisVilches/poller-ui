import { PlusIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

interface NavigationsFormProps {
  selectors: string[];
  onChange: (s: string[]) => void;
}

export const NavigationsForm = ({ selectors, onChange }: NavigationsFormProps) => {
  const onChangeHandler = (idx: number, selector: string) => {
    const newSelectors = [...selectors];
    newSelectors[idx] = selector;
    onChange(newSelectors);
  };

  const addNew = () => {
    onChange([...selectors, ""]);
  };

  const remove = (idx: number) => {
    const newSelectors = [...selectors];
    newSelectors.splice(idx, 1);
    onChange(newSelectors);
  };

  // TODO: This is just for testing.
  const [val] = useState(Math.random());
  console.log(val);

  return (
    <>
      <div className="mb-4 max-h-60 overflow-y-auto">
        { selectors.map((selector: string, idx: number) => (
          <div className="flex space-x-4 mb-4" key={ idx }>
            <input type="text"
              className="grow bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              placeholder=".some-class"
              value={ selector || "" }
              onChange={ (ev) => onChangeHandler(idx, ev.currentTarget.value) } />
            <button className="btn btn-danger" onClick={ () => remove(idx) }>
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        )) }
      </div>
      <button className="btn btn-secondary" onClick={ addNew }><PlusIcon className="w-4 h-4"/></button>
    </>
  );
};
