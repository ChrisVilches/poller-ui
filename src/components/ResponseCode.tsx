import React from "react";

interface ResponseCodeProps {
  code: number;
}

export const ResponseCode = ({ code }: ResponseCodeProps) => {
  if (!code) {
    return <></>;
  }

  const codeNumber = +code;

  if(codeNumber >= 200 && codeNumber < 400) {
    return <span className="inline-block rounded-md p-2 bg-green-600 text-white">{ codeNumber }</span>;
  }

  if(codeNumber >= 400) {
    return <span className="inline-block rounded-md p-2 bg-red-600 text-white">{ codeNumber }</span>;
  }

  return <span className="inline-block rounded-md p-2 bg-gray-600 text-white">{ codeNumber }</span>;
};
