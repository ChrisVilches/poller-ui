import React from "react";
import { truncateString } from "../util/strings";

export const MessageCell = ({ message, error }: { message: string, error?: string}) => {
  if (message) {
    return <div>{ message }</div>;
  }

  if (error) {
    // Heuristic to improve the error message.
    if (error.includes("net::ERR_NAME_NOT_RESOLVED") || error.includes("getaddrinfo EAI_AGAIN")) {
      error = "Network Error";
    }
    return <span className="text-red-500">{ truncateString(error) }</span>; 
  }

  return <i className="text-gray-400">None</i>;
};
