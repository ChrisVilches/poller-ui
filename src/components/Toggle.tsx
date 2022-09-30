import { Switch } from "@headlessui/react";
import React from "react";

interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChange: (checked: boolean) => void;
}

export const Toggle = ({ checked, disabled, onChange }: ToggleProps) => (
  <Switch
    disabled={ disabled }
    checked={ checked }
    className={ `${checked ? "bg-green-500" : "bg-gray-300"} relative inline-flex h-6 w-11 items-center
    rounded-full disabled:bg-blue-300` }
    onChange={ onChange }>
    <span
      className={ `${checked ? "translate-x-6" : "translate-x-1"} inline-block h-4 w-4 transform
      rounded-full bg-white transition` } />
  </Switch>
);
