import React from "react";
import TimeAgo from "react-timeago";
import { PairLabelValueCols } from "./PairLabelValueCols";
import { EventAttempt, EventInitialize, EventSuccess, SocketEvent, useSocketListen } from "../hooks/useSocketListen";

const formatter = (value, unit, suffix, _epochMilliseconds, nextFormatter) => {
  if(unit === "second" && suffix === "ago" && value < 60) {
    return "Just now";
  }

  return nextFormatter();
};

const ConnectedDot = () => (
  <span className="flex h-3 w-3">
    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-green-500 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-600"></span>
  </span>
);

const DisconnectedDot = () => (
  <span className="flex h-3 w-3">
    <span className="absolute inline-flex h-3 w-3 rounded-full bg-red-500 opacity-75"></span>
  </span>
);

const eventNames = [
  "polling.initialize",
  "polling.attempt",
  "polling.success"
];

interface EventItemProps {
  type: string;
  data: EventInitialize | EventAttempt | EventSuccess;
}

const EventInitializeItem = ({ message }: { message: string }) => (
  <span>
    { message }
  </span>
);

const EventAttemptItem = ({ endpoint }: { endpoint: EventAttempt }) => (
  <span>
    Polling <b>{ endpoint.title }</b>...
  </span>
);

const EventSuccessItem = ({ polling: { endpoint, ...result } }: { polling: EventSuccess }) => (
  <span>
    Polled <b>{ endpoint.title }</b>
    <div className="my-8">
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <PairLabelValueCols left={ "Response Code" } right={ result.responseCode }/>
        <PairLabelValueCols left={ "Should Notify" } right={ result.shouldNotify ? "Yes" : "No" }/>
      </div>
      <div className="text-center">
        { result.computedMessage }
      </div>
    </div>
  </span>
);

// TODO: Event for error should also be included.
const EventItem = ({ type, data }: EventItemProps) => {
  switch(type){
  case "polling.initialize":
    return <EventInitializeItem message={ data as EventInitialize }/>;
  case "polling.attempt":
    return <EventAttemptItem endpoint={ data as EventAttempt }/>;
  case "polling.success":
    return <EventSuccessItem polling={ data as EventSuccess }/>;
  }

  return <span>Unknown event type</span>;
};

export const EventLogger = () => {
  const { isConnected, events } = useSocketListen(eventNames);

  return (
    <div className="rounded-xl bg-yellow-400 p-4">

      { isConnected ? <ConnectedDot/> : <DisconnectedDot/> }
      
      <div className="mt-4 max-h-60 h-60 scroll-smooth overflow-y-scroll pr-4">
        { events.map(({ timestamp, type, data }: SocketEvent, idx: number) => (
          <div key={ idx } className="bg-yellow-500 rounded-md p-2 my-2 break-words">
            <span className="text-sm float-right ml-8">
              <TimeAgo date={ timestamp } formatter={ formatter }/>
            </span>

            <EventItem type={ type } data={ data }/>
          </div>
        )) }

      </div>
    </div>
  );
};
