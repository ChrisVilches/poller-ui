import React from "react";
import { Link } from "react-router-dom";

interface ButtonIconLinkProps {
  className?: string;
  icon: React.ElementType;
  to: string;
  children: React.ReactNode;
}

export const ButtonIconLink = ({
  children,
  className = "",
  icon: Icon,
  to
}: ButtonIconLinkProps) => (
  <Link className={ `flex place-items-center ${className}` } to={ to }>
    <Icon className="w-4 h-4 mr-2"/>
    <span>{ children }</span>
  </Link>
);
