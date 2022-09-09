import React from "react";
import { EndpointList } from "../components/EndpointList";
import { EventLogger } from "../components/EventLogger";

export const Home = () => (
  <div>
    <EventLogger />
    <EndpointList />
  </div>
);
