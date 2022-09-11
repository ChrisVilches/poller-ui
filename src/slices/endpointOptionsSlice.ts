import { createSlice } from "@reduxjs/toolkit";
import { Endpoint } from "../models/Endpoint";

export interface EndpointOptionsState {
  selectedEndpoint?: Endpoint;
  showEditModal: boolean;
  showPollDialog: boolean;
  showRemoveDialog: boolean;
}

const initialState: EndpointOptionsState = {
  selectedEndpoint: undefined,
  showEditModal: false,
  showPollDialog: false,
  showRemoveDialog: false
};

export const endpointOptionsSlice = createSlice({
  initialState,
  name: "endpointOptionsSlice",
  reducers: {
    setSelectedEndpoint: (state, { payload: { endpoint } }) => {
      state.selectedEndpoint = endpoint;
    },
    toggleEditModal: (state) => {
      state.showEditModal = !state.showEditModal;
    },
    togglePollDialog: (state) => {
      state.showPollDialog = !state.showPollDialog;
    },
    toggleRemoveDialog: (state) => {
      state.showRemoveDialog = !state.showRemoveDialog;
    }
  }
});

export const {
  toggleEditModal,
  togglePollDialog,
  toggleRemoveDialog,
  setSelectedEndpoint
} = endpointOptionsSlice.actions;
