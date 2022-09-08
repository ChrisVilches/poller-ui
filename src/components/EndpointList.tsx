import { plainToInstance } from "class-transformer";
import { Button } from "flowbite-react";
import React, { useEffect, useReducer, useState } from "react";
import { toast } from "react-toastify";
import { EditModal } from "./EndpointForm/EditModal";
import { NewModal } from "./EndpointForm/NewModal";
import { EndpointItem } from "./EndpointItem";
import { Endpoint } from "../models/Endpoint";
import { EndpointService } from "../services/EndpointService";

enum EndpointReducerActions {
  SET_ALL,
  UPDATE_ENABLED,
  REPLACE_ITEM,
  ADD_ITEM
}

const updateEnabled = (state, { endpointId, enabled }) => {
  const newState = [...state];
  newState.find((e: Endpoint) => e.id === endpointId).enabled = enabled;
  return newState;
};

const replaceItem = (state, { endpointId, newEndpoint }) => {
  const newState = [...state];
  const idx = newState.findIndex((e: Endpoint) => e.id === endpointId);
  newState[idx] = plainToInstance(Endpoint, newEndpoint);
  return newState;
};

const addItem = (state, { newEndpoint }) => {
  const newState = [...state];
  newState.push(newEndpoint);
  return newState;
};

const endpointsReducer = (state: any, action: any) => {
  switch (action.type) {
  case EndpointReducerActions.SET_ALL:
    return action.payload;
  case EndpointReducerActions.UPDATE_ENABLED:
    return updateEnabled(state, action.payload);
  case EndpointReducerActions.REPLACE_ITEM:
    return replaceItem(state, action.payload);
  case EndpointReducerActions.ADD_ITEM:
    return addItem(state, action.payload);
  default:
    throw new Error("Incorrect reducer action");
  }
};

export const EndpointList = () => {
  const [endpoints, dispatch] = useReducer(endpointsReducer, []);

  const fetchEndpoints = async () => {
    console.log("Fetching endpoints...");
    const endpoints = await EndpointService.findAll();
    dispatch({
      payload: endpoints,
      type: EndpointReducerActions.SET_ALL
    });
  };

  useEffect(() => {
    fetchEndpoints();
  }, []);

  const toggleEnable = (endpointId: number) => (enabled: boolean) => dispatch({
    payload: {
      enabled,
      endpointId
    },
    type: EndpointReducerActions.UPDATE_ENABLED
  });

  const replaceItem = (endpointId: number) => (newEndpoint: Endpoint) => dispatch({
    payload: {
      endpointId,
      newEndpoint
    },
    type: EndpointReducerActions.REPLACE_ITEM
  });

  const addItem = (newEndpoint: Endpoint) => dispatch({
    payload: { newEndpoint },
    type: EndpointReducerActions.ADD_ITEM
  });

  const [editModalShow, setEditModalShow] = useState(false);
  const [newModalShow, setNewModalShow] = useState(false);
  const [editingEndpoint, setEditingEndpoint] = useState(null);

  const onClickEditEndpoint = (endpointId: number) => {
    setEditingEndpoint(endpoints.find((e: Endpoint) => e.id === endpointId));
    setEditModalShow(true);
  };

  const onItemWasUpdated = (endpoint: Endpoint) => {
    replaceItem(endpoint.id)(endpoint);
    toast.success("Edited!");
    setEditModalShow(false);
  };

  const onItemWasAdded = (endpoint: Endpoint) => {
    addItem(endpoint);
    toast.success("Added!");
    setNewModalShow(false);
  };

  return (
    <div>
      <h2>Endpoints ({ endpoints.length })</h2>

      { endpoints.map(endpoint => (
        <div key={ endpoint.id } className="my-10 border-slate-500 border-2 p-4">
          <Button onClick={ () => onClickEditEndpoint(endpoint.id) }>
            Edit
          </Button>
          <EndpointItem
            endpoint={ endpoint }
            toggleEnable={ toggleEnable(endpoint.id) } />
        </div>
      )) }

      { editingEndpoint ? (
        <EditModal
          endpoint={ editingEndpoint }
          show={ editModalShow }
          closeModal={ () => setEditModalShow(false) }
          itemEdited={ onItemWasUpdated } />
      ) : <></> }

      <Button onClick={ () => setNewModalShow(true) }>
        Create
      </Button>

      <NewModal
        show={ newModalShow }
        closeModal={ () => setNewModalShow(false) }
        itemAdded={ onItemWasAdded } />

    </div>
  );
};
