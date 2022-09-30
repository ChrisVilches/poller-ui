import Tippy from "@tippyjs/react";
import React from "react";
import { includesAny, truncateString } from "../util/strings";

const NETWORK_ERROR_PATTERNS = [
  "net::ERR_NAME_NOT_RESOLVED",
  "getaddrinfo EAI_AGAIN",
  "ERR_CERT_COMMON_NAME_INVALID"
];

const cleanErrorMessage = (error: string) => {
  // Heuristic to improve the error message.
  if (includesAny(error, NETWORK_ERROR_PATTERNS)) {
    error = "Network Error";
  }

  return error;
};

export const MessageCell = ({ message, error }: { message: string; error?: string }) => {
  if (message) {
    return <div>{ message }</div>;
  }

  const tooltip = error;

  if (error) {
    return (
      <span className="text-red-500">
        <Tippy content={ tooltip }>
          <span>
            { truncateString(cleanErrorMessage(error)) }
          </span>
        </Tippy>
      </span>
    );
  }

  return <i className="text-gray-400">None</i>;
};
