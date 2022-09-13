import { Spinner } from "flowbite-react";
import React, { ChangeEventHandler } from "react";

interface CheckboxProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onChange: ChangeEventHandler
}

export const Checkbox = ({ checked, label, onChange, disabled = false, loading = false }: CheckboxProps) => (
  <div>
    <label>
      <input className="checkbox"
        disabled={ disabled }
        type="checkbox"
        defaultChecked={ checked }
        onChange={ onChange } />
      <span
        className={ disabled ? "ml-2 text-sm font-medium text-gray-400" : "ml-2 text-sm font-medium text-slate-100" }>
        { label }
        <Spinner className="w-2 h-2" style={ { visibility: loading ? "visible" : "hidden" } }/>
      </span>
    </label>
  </div>
);
