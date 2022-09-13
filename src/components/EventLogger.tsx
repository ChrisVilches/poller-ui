import React, { useMemo } from "react";
import TimeAgo from "react-timeago";
import { useSocketListen } from "../hooks/useSocketListen";

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

export const EventLogger = () => {
  const { isConnected, events } = useSocketListen(eventNames);

  return (
    <div className="rounded-xl bg-yellow-400 p-4">

      { isConnected ? <ConnectedDot/> : <DisconnectedDot/> }
      
      <div className="mt-4 max-h-60 h-60 scroll-smooth overflow-y-scroll pr-4">
        { events.map(({ timestamp, message, ...extra }: any, idx: number) => (
          <div key={ idx } className="bg-yellow-500 rounded-md p-2 my-2 break-words">
            <span className="text-sm float-right ml-8">
              <TimeAgo date={ timestamp } formatter={ formatter }/>
            </span>
            <span>
              { message }
            </span>
            { JSON.stringify(extra) }
          </div>
        )) }

      </div>
    </div>
  );
};
