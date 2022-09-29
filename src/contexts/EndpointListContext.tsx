import React, { Dispatch, ReactNode, createContext, useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Endpoint } from "../models/Endpoint";
import { EndpointListReducerAction, endpointListReducer } from "../reducers/endpointListReducer";

const initialState = {
  endpoints: [] as Endpoint[],
  isLoading: true
};

export const EndpointListContext = createContext<typeof initialState>(initialState);
export const EndpointListDispatchContext = createContext<Dispatch<EndpointListReducerAction>>(() => null);

interface EndpointListContextProviderProps {
  endpointsFetch: () => Promise<Endpoint[]> | Endpoint[];
  children: ReactNode;
}

// TODO: The way to use this component is a bit strange. I think it'd be better to:
//       1) Pass endpoints and isLoading from props
//       2) Create a useEffect to set the set_all (reducer) to set the endpoints from props
//       3) From the components that use this component, pass the data using RTK Query, because it's cuter than axios.
export const EndpointListContextProvider = ({ children, endpointsFetch }: EndpointListContextProviderProps) => {
  const [
    { endpoints, isLoading },
    dispatch
  ] = useImmerReducer<typeof initialState, EndpointListReducerAction>(endpointListReducer, initialState);

  const fetchEndpoints = useCallback(async () => {
    dispatch({ type: "set_loading" });
    dispatch({ payload: await endpointsFetch(), type: "set_all" });
  }, [dispatch, endpointsFetch]);

  useEffect(() => {
    fetchEndpoints();
  }, [fetchEndpoints]);

  return (
    <EndpointListDispatchContext.Provider value={ dispatch }>
      <EndpointListContext.Provider value={ { endpoints, isLoading } }>
        { children }
      </EndpointListContext.Provider>
    </EndpointListDispatchContext.Provider>
  );
};
