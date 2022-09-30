import React, { Dispatch, ReactNode, createContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Endpoint } from "../models/Endpoint";
import { EndpointFormReducerAction, endpointFormReducer } from "../reducers/endpointFormReducer";

export const EndpointFormContext = createContext<Endpoint>(new Endpoint());
export const EndpointFormDispatchContext = createContext<Dispatch<EndpointFormReducerAction>>(() => null);

interface EndpointFormContextProviderProps {
  children: ReactNode;
  endpoint: Endpoint;
}

export const EndpointFormContextProvider = ({ children, endpoint }: EndpointFormContextProviderProps) => {
  const [endpointState, dispatch] = useImmerReducer<Endpoint, EndpointFormReducerAction>(
    endpointFormReducer,
    endpoint
  );

  useEffect(() => {
    dispatch({ payload: endpoint, type: "set_endpoint" });
  }, [endpoint, dispatch]);

  return (
    <EndpointFormDispatchContext.Provider value={ dispatch }>
      <EndpointFormContext.Provider value={ endpointState }>
        { children }
      </EndpointFormContext.Provider>
    </EndpointFormDispatchContext.Provider>
  );
};
