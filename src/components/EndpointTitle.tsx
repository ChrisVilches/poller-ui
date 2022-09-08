import React from "react";

interface EndpointTitleProps {
  title: string
}

export const EndpointTitle = ({ title }: EndpointTitleProps) => {
  if (!title) {
    return <i>Untitled</i>;
  }

  return <span>{ title }</span>;
};
