import { Button } from "flowbite-react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Checkbox } from "./Checkbox";
import { NewModal } from "./EndpointForm/NewModal";
import { EndpointItem } from "./EndpointItem";
import { EndpointOptionModals } from "./EndpointOptionModals";
import { EndpointOptions } from "./EndpointOptions";
import { EndpointListContext } from "../contexts/EndpointListContext";
import { Endpoint } from "../models/Endpoint";


export const EndpointList = () => {
  const { isLoading, endpoints, dispatch } = useContext(EndpointListContext);

  const [onlyEnabled, setOnlyEnabled] = useState(true);

  const [newModalShow, setNewModalShow] = useState(false);

  const onItemWasAdded = (endpoint: Endpoint) => {
    dispatch({ payload: endpoint, type: "add_item" });
    toast.success("Added!");
    setNewModalShow(false);
  };

  if(isLoading) {
    return <div>Loading...</div>;
  }

  const applyFilters = (initialList: Endpoint[]) => {
    const filters: ((e: Endpoint) => boolean)[] = [];

    if(onlyEnabled) {
      filters.push((e: Endpoint) => e.enabled);
    }

    const reducer = (accum: Endpoint[], fn: ((e: Endpoint) => boolean)) => accum.filter(fn);

    return filters.reduce(reducer, initialList);
  };

  return (
    <div>
      <h2>Endpoints ({ endpoints.length })</h2>

      <Checkbox label="Only enabled" checked={ onlyEnabled } onChange={ () => setOnlyEnabled(!onlyEnabled) }/>

      { /* TODO: This button/modal/functionality is unrelated to the concern of this component. */ }
      <Button onClick={ () => setNewModalShow(true) }>
        Create
      </Button>

      { applyFilters(endpoints).map(endpoint => (
        <div key={ endpoint.id } className="my-8 border-gray-200 shadow-lg border-2 rounded-md p-4">
          <div className="float-right">
            <EndpointOptions endpoint={ endpoint }/>
          </div>

          <EndpointItem
            endpoint={ endpoint }
            toggleEnable={ (enabled: boolean) => dispatch({ payload: { enabled, endpointId: endpoint.id }, type: "update_enabled" }) } />
        </div>
      )) }

      <EndpointOptionModals/>

      <NewModal
        show={ newModalShow }
        closeModal={ () => setNewModalShow(false) }
        itemAdded={ onItemWasAdded } />
    </div>
  );
};

