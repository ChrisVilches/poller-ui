import React from "react";
import { EventAttempt } from "../../interfaces/events";

export const EventAttemptItem = ({ endpoint }: { endpoint: EventAttempt }) => (
  <span>
    Polling <b>{ endpoint.title }</b>...
  </span>
);
