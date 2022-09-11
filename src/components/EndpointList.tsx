import { AnimatePresence } from "framer-motion";
import React, { useContext, useState } from "react";
import { Checkbox } from "./Checkbox";
import { EndpointItem } from "./EndpointItem";
import { EndpointOptionModals } from "./EndpointOptionModals";
import { EndpointOptions } from "./EndpointOptions";
import { EndpointListContext, EndpointListDispatchContext } from "../contexts/EndpointListContext";
import { Endpoint } from "../models/Endpoint";

export const EndpointList = () => {
  const dispatch = useContext(EndpointListDispatchContext);
  const { isLoading, endpoints } = useContext(EndpointListContext);

  const [onlyEnabled, setOnlyEnabled] = useState(true);

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
      <h2>Enabled ({ endpoints.filter((e: Endpoint) => e.enabled).length })</h2>

      <Checkbox label="Only enabled" checked={ onlyEnabled } onChange={ () => setOnlyEnabled(!onlyEnabled) }/>

      <AnimatePresence>
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
      </AnimatePresence>

      <EndpointOptionModals/>
    </div>
  );
};

