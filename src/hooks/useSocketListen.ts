import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const useSocketListen = (eventNames: string[]) => {
  const socket = useMemo(() => {
    console.log("Connecting to Socket (useMemo)");
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

    eventNames.forEach((name: string) => {
      socket.on(name, data => {
        console.log(`Event received: ${name}`); 
        console.log(data);
        
        setEvents((state: any[]) => {
          const newState: any[] = [...state];
          data.eventName = name;
          newState.push(data);
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
