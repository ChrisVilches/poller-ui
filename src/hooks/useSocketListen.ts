import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { WS_ENDPOINT_BASE, WS_ENDPOINT_PATH } from "../config";
import { EventAttempt, EventInitialize, EventSuccess } from "../interfaces/events";

export interface SocketEvent {
  timestamp: Date;
  type: string;
  data: EventInitialize | EventAttempt | EventSuccess;
}

export const useSocketListen = (eventNames: string[]) => {
  const socket = useMemo(() => {
    console.log("Connecting to Socket (useMemo)");
    return io(WS_ENDPOINT_BASE, { path: WS_ENDPOINT_PATH });
  }, []);

  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState<SocketEvent[]>([]);

  useEffect(() => {
    console.log("Executing socket useEffect");

    socket.on("connect", () => {
      console.log("Connected");
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
      setIsConnected(false);
    });

    eventNames.forEach((name: string) => {
      socket.on(name, data => {
        console.log(`Event received: ${name}`); 
        console.log(data);
        
        setEvents((state: SocketEvent[]) => {
          const newState: SocketEvent[] = [...state];
          data.type = name;
          data.timestamp = new Date(data.timestamp);
          newState.push(data);
          console.log("Event:");
          console.log(data);
          return newState;
        });
      });
    });

    return () => {
      console.log("Disconnecting.");
      socket.off("connect");
      socket.off("disconnect");
      
      eventNames.forEach((name: string) => {
        socket.off(name);
      });

      socket.disconnect();
    };
  }, [socket, eventNames]);

  return {
    events,
    isConnected
  };
};
