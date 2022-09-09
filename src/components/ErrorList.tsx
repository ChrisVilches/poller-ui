import React from "react";

interface ErrorListProps {
  errors: string[]
  className?: string
}

export const ErrorList = ({ className = "", errors }: ErrorListProps) => {

  if (errors.length === 0) return <></>;

  return (
    <div className={ `bg-red-100 border border-red-400 text-red-700 px-8 py-3 rounded relative ${className}` } role="alert">
      <ul className="list-disc">
        { errors.map((error: string, idx: number) => (
          <li key={ idx }>
            <span>{ error }</span>
          </li>
        )) }
      </ul>
    </div>
  );
};
