import { ChangeEventHandler } from "react";

interface CheckboxProps {
  checked: boolean;
  disabled: boolean;
  label: string;
  onChange: ChangeEventHandler
}

export const Checkbox = ({ checked, label, onChange, disabled }: CheckboxProps) => (
  <div>
    <label>
      <input className="px-2 py-2 rounded-full mr-2" disabled={disabled} type="checkbox" defaultChecked={checked} onChange={onChange} />
      {label}
    </label>
  </div>
)
