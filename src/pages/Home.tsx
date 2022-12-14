import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ButtonIcon } from "../components/ButtonIcon";
import { NewModal } from "../components/EndpointForm/NewModal";
import { EndpointList } from "../components/EndpointList";
import { EventLogger } from "../components/EventLogger";
import { HelmetTitle } from "../components/HelmetTitle";
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
      <div className="float-right">
        <ButtonIcon
          className="btn btn-primary"
          onClick={ () => setNewModalShow(true) }
          icon={ PlusIcon }>Create</ButtonIcon>

      </div>

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
    <HelmetTitle subtitles={ [] } />
    <div className="mb-8">
      <EventLogger />
    </div>

    <EndpointListContextProvider endpointsFetch={ EndpointService.findAll }>
      <EndpointListAux />
    </EndpointListContextProvider>
  </>
);
