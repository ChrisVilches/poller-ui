import React, { Dispatch, ReactNode, createContext, useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Endpoint } from "../models/Endpoint";

const initialState = {
  endpoints: [] as Endpoint[],
  isLoading: true
};

type EndpointListReducerAction =
| { type: "set_loading" }
| { type: "set_all", payload: Endpoint[] }
| { type: "add_item", payload: Endpoint }
| { type: "update_item", payload: { endpointId: number, endpoint: Endpoint } }
| { type: "update_enabled", payload: { endpointId: number, enabled: boolean } }
| { type: "remove_item", payload: { endpointId: number } }

export const EndpointListContext = createContext<typeof initialState>(initialState);
export const EndpointListDispatchContext = createContext<Dispatch<EndpointListReducerAction>>(() => null);

const reducer = (draft, action) => {
  const { type, payload } = action;
  switch (type) {
  case "set_loading":
    draft.isLoading = true;
    break;
  case "set_all":
    draft.endpoints = payload;
    draft.isLoading = false;
    break;
  case "add_item":
    draft.endpoints.push(payload);
    break;
  case "update_item": {
    const idx = draft.endpoints.findIndex((e: Endpoint) => e.id === payload.endpointId);
    draft.endpoints[idx] = payload.endpoint;
    break;
  }
  case "update_enabled":
    draft.endpoints.find((e: Endpoint) => e.id === payload.endpointId).enabled = payload.enabled;
    break;
  case "remove_item": {
    const idx = draft.endpoints.findIndex((e: Endpoint) => e.id === payload.endpointId);
    draft.endpoints.splice(idx, 1);
    break;
  }
  default:
    throw new Error("Invalid action");
  }
};

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
  ] = useImmerReducer<typeof initialState, EndpointListReducerAction>(reducer, initialState);

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
