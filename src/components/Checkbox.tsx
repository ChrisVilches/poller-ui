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
      <input className="w-4 h-4 text-teal-600 bg-gray-100 rounded border-gray-300 focus:ring-teal-500"
        disabled={ disabled }
        type="checkbox"
        defaultChecked={ checked }
        onChange={ onChange } />
      <span
        className={ disabled ? "ml-2 text-sm font-medium text-gray-400" : "ml-2 text-sm font-medium text-gray-900" }>
        { label }
        { loading ? "Loading..." : "" }
      </span>
    </label>
  </div>
);
