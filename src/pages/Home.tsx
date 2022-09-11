import { Button } from "flowbite-react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { NewModal } from "../components/EndpointForm/NewModal";
import { EndpointList } from "../components/EndpointList";
import { EventLogger } from "../components/EventLogger";
import { EndpointListContextProvider, EndpointListDispatchContext } from "../contexts/EndpointListContext";
import { Endpoint } from "../models/Endpoint";
import { EndpointService } from "../services/EndpointService";

const EndpointListAux = () => {  
  const dispatch = useContext(EndpointListDispatchContext);
  const [newModalShow, setNewModalShow] = useState(false);

  const onItemWasAdded = (endpoint: Endpoint) => {
    dispatch({ payload: endpoint, type: "add_item" });
    toast.success("Added!");
    setNewModalShow(false);
  };

  return (
    <>
      <Button onClick={ () => setNewModalShow(true) }>
        Create
      </Button>

      <EndpointList />

      <NewModal
        show={ newModalShow }
        closeModal={ () => setNewModalShow(false) }
        itemAdded={ onItemWasAdded } />
    </>
  );
};

export const Home = () => (
  <>
    <EventLogger />

    <EndpointListContextProvider endpointsFetch={ EndpointService.findAll }>
      <EndpointListAux />
    </EndpointListContextProvider>
  </>
);
