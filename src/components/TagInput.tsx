import { HashtagIcon } from '@heroicons/react/24/outline'
import React from 'react'

interface TagInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export const TagInput = ({
  inputRef,
  isLoading,
  value,
  onChange,
  className
}: TagInputProps) => (
  <div className="flex items-center">
    <HashtagIcon className="w-4 h-4 absolute text-black ml-1"/>
    <input ref={ inputRef }
      disabled={ isLoading }
      type="text"
      className={`indent-4 ${className || ""}`}
      value={ value }
      onChange={ onChange }/>
  </div>
)
