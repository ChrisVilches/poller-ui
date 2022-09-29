import { Endpoint } from "../models/Endpoint";

export type EndpointListReducerAction =
| { type: "set_loading", payload?: null }
| { type: "set_all", payload: Endpoint[] }
| { type: "add_item", payload: Endpoint }
| { type: "update_item", payload: { endpointId: number, endpoint: Endpoint } }
| { type: "update_enabled", payload: { endpointId: number, enabled: boolean } }
| { type: "remove_item", payload: { endpointId: number } }

export const endpointListReducer = (draft, action: EndpointListReducerAction) => {
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
