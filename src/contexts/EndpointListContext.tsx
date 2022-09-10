import React, { Dispatch, ReactNode, createContext, useCallback, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Endpoint } from "../models/Endpoint";


/**
 * TODO: There are different ways to pass state and dispatch from context provider down the tree.
 * https://davidwcai.medium.com/state-management-in-react-with-reducer-but-not-redux-3e76824fe4e5
 * https://hswolff.com/blog/how-to-usecontext-with-usereducer/
 * 
 * Passing state and dispatch can cause performance issues. Both these websites talk about
 * using two distinct context providers, one for state and another one for the "dispatch" function.
 */

// TODO: This initial state is weird. Shouldn't be defined here I think, because the data isn't used anyway.
//       Should be defined only in the context provider, not in the createContext. (I THINK, CONFIRM!!!)

const initialState = {
  dispatch: (() => {}) as Dispatch<any>,
  endpoints: [] as Endpoint[],
  isLoading: true
};

export const EndpointListContext = createContext(initialState);

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
    console.log(payload);
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

export const EndpointListContextProvider = ({ children, endpointsFetch }: EndpointListContextProviderProps) => {
  const [{ endpoints, isLoading }, dispatch] = useImmerReducer(reducer, initialState);
  
  const fetchEndpoints = useCallback(async () => {
    dispatch({ type: "set_loading" });
    dispatch({ payload: await endpointsFetch(), type: "set_all" });
  }, [dispatch, endpointsFetch]);

  useEffect(() => {
    fetchEndpoints();
  }, [fetchEndpoints]);

  return (
    <EndpointListContext.Provider value={ { dispatch, endpoints, isLoading } }>
      { children }
    </EndpointListContext.Provider>
  );
};
