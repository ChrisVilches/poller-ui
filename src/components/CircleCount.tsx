import React from "react";

interface CircleCountProps {
  count: number;
  className?: string;
}

export const CircleCount = ({ count, className = "" }: CircleCountProps) => (
  <div className={ `rounded-full p-1.5 py-0 flex items-center justify-center text-sm ${className}` }>
    { count }
  </div>
);
