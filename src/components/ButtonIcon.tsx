import React, { MouseEventHandler } from "react";

interface ButtonIconProps {
  className?: string;
  icon: React.ElementType;
  iconClassName?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export const ButtonIcon = ({
  children,
  className = "",
  icon: Icon,
  onClick,
  iconClassName = "w-6 h-6"
}: ButtonIconProps) => (
  <button className={ className } onClick={ onClick }>
    <div className="flex space-x-2">
      <Icon className={ iconClassName }/>
      <span>{ children }</span>
    </div>
  </button>
);
