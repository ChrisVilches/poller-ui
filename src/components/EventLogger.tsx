import React from "react";
import { useSocketListen } from "../hooks/useSocketListen";


export const EventLogger = () => {
  const { isConnected, events } = useSocketListen("pong");

  return (
    <>
      Online: { isConnected ? "Yes" : "No" }
      <br></br>
      { events.map((ev: any, idx: number) => (
        <div key={ idx }>
          { JSON.stringify(ev) }
        </div>
      )) }
    </>
  );
};
