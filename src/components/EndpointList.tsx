import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { NewModal } from "./EndpointForm/NewModal";
import { EndpointItem } from "./EndpointItem";
import { EndpointOptionModals } from "./EndpointOptionModals";
import { EndpointOptions } from "./EndpointOptions";
import { Endpoint } from "../models/Endpoint";
import { addItem, fetchAllEndpoints, updateEnabled } from "../slices/endpointListSlice";
import { RootState } from "../store";

export const EndpointList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch((fetchAllEndpoints as any)()); // TODO: Doesn't work without any, but seems to be correct.
  }, []);

  const updateEnabledCallback = (endpointId: number) => (enabled: boolean) => dispatch(updateEnabled({
    endpointId, enabled
  }));

  const [newModalShow, setNewModalShow] = useState(false);

  const onItemWasAdded = (endpoint: Endpoint) => {
    dispatch(addItem({ endpoint }));
    toast.success("Added!");
    setNewModalShow(false);
  };

  const { endpoints, isLoading } = useSelector((state: RootState) => state.endpointList);

  if(isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Endpoints ({ endpoints.length })</h2>

      { endpoints.map(endpoint => (
        <div key={ endpoint.id } className="my-8 border-gray-200 shadow-lg border-2 rounded-md p-4">
          <div className="float-right">
            <EndpointOptions endpoint={ endpoint }/>
          </div>

          <EndpointItem
            endpoint={ endpoint }
            toggleEnable={ updateEnabledCallback(endpoint.id) } />
        </div>
      )) }

      <Button onClick={ () => setNewModalShow(true) }>
        Create
      </Button>

      <EndpointOptionModals/>

      <NewModal
        show={ newModalShow }
        closeModal={ () => setNewModalShow(false) }
        itemAdded={ onItemWasAdded } />

    </div>
  );
};
