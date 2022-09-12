import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";
import React from "react";

interface NavigationsFormProps {
  selectors: string[];
  onChange: Function
}

export const NavigationsForm = ({ selectors, onChange }: NavigationsFormProps) => {
  const onChangeHandler = (idx: number, selector: any) => {
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

  return (
    <div>
      { selectors.map((selector: string, idx: number) => (
        <div key={ idx }>
          <input type="text"
            placeholder=".some-class"
            value={ selector || "" }
            onChange={ (ev) => onChangeHandler(idx, ev.currentTarget.value) } />
          <TrashIcon className="w-4 h-4" onClick={ () => remove(idx) } />
        </div>
      )) }
      <Button onClick={ addNew }>+</Button>
    </div>
  );
};
