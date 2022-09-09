import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { plainToInstance } from "class-transformer";
import { Endpoint } from "../models/Endpoint";
import { EndpointService } from "../services/EndpointService";

export interface EndpointListState {
  endpoints: Endpoint[];
  isLoading: boolean;
}

const initialState: EndpointListState = {
  endpoints: [],
  isLoading: true
};

export const fetchAllEndpoints = createAsyncThunk(
  "whatshouldgohere", // TODO: What should go here?
  () => EndpointService.findAll()
);

export const endpointListSlice = createSlice({
  name: "endpointList",
  initialState,
  reducers: {
    addItem: (state, { payload: { endpoint } }) => {
      state.endpoints.push(endpoint);
    },
    removeItem: (state, { payload: { endpoint } }) => {
      const idx = state.endpoints.findIndex((e: Endpoint) => e.id === endpoint.id);
      state.endpoints.splice(idx, 1);
    },
    updateItem: (state, { payload: { endpointId, endpoint } }) => {
      const idx = state.endpoints.findIndex((e: Endpoint) => e.id === endpointId);
      state.endpoints[idx] = plainToInstance(Endpoint, endpoint);
    },
    updateEnabled: (state, { payload: { endpointId, enabled } }) => {
      const endpoint: Endpoint | undefined = state.endpoints?.find((e: Endpoint) => e.id === endpointId);
    
      if(endpoint) {
        endpoint.enabled = enabled;
      }
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAllEndpoints.pending, (state) => {
        console.log("Pending");
        state.isLoading = true;
      })
      .addCase(fetchAllEndpoints.fulfilled, (state, action) => {
        console.log("Fulfilled");
        state.endpoints = action.payload;
        state.isLoading = false;
      });
  }
});

export const { addItem, removeItem, updateItem, updateEnabled } = endpointListSlice.actions;
