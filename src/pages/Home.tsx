import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EndpointList } from "../components/EndpointList";
import { EventLogger } from "../components/EventLogger";
import { fetchAllEndpoints } from "../slices/endpointListSlice";
import { RootState } from "../store";

export const ListContext = createContext({
  value: 12369
})

export const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch((fetchAllEndpoints as any)()); // TODO: Doesn't work without any, but seems to be correct.
  }, [dispatch]);

  const { endpoints, isLoading } = useSelector((state: RootState) => state.endpointList);
  
  return (
    <div>
      <ListContext.Provider value={{ value: 666999 }}>
        <EventLogger />
        <EndpointList endpoints={endpoints} isLoading={isLoading}/>
      </ListContext.Provider>
    </div>
  );
};
