import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const useSocketListen = (eventName: string) => {
  const socket = useMemo(() => {
    console.log("Connecting to Socket (useMemo)");
    // TODO: Does this reuse the same connection (or memoize, etc)
    //       if the hook is used multiple times???? (Note: the console.log
    //       in the initialization is printed multiple times, so I worry this may
    //       be creating several connections.) The documentation says it "reuses"
    //       the instance, but what does that mean exactly?
    return io("ws://localhost:3000");
  }, []);

  const [isConnected, setIsConnected] = useState(false);
  const [events, setEvents] = useState([] as any[]);

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
    
    socket.on(eventName, (data) => {
      console.log(`Event received: ${eventName}`); 
      console.log(data);
      
      setEvents((state: any[]) => {
        const newState: any[] = [...state];
        newState.push(data);
        return newState;
      });
    });

    return () => {
      console.log("Disconnecting.");
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [socket, eventName]);

  return {
    events,
    isConnected
  };
};
