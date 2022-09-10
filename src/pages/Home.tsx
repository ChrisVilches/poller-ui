import React from "react";
import { EndpointList } from "../components/EndpointList";
import { EventLogger } from "../components/EventLogger";
import { EndpointListContextProvider } from "../contexts/EndpointListContext";
import { EndpointService } from "../services/EndpointService";

export const Home = () => {
  return (
    <>
      <EventLogger />

      <EndpointListContextProvider endpointsFetch={ EndpointService.findAll }>
        <EndpointList />
      </EndpointListContextProvider>
    </>
  );
};
