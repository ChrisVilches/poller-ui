import { Spinner } from "flowbite-react";
import { AnimatePresence } from "framer-motion";
import React, { useContext, useState } from "react";
import { CircleCount } from "./CircleCount";
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
    return <Spinner/>;
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
      <section className="filters-container">
        <button onClick={ () => setOnlyEnabled(false) }
          className={ `filters-item ${onlyEnabled ? "" : "filters-item-active"}` }>
          <div className="flex items-center space-x-4">
            <span>
              All
            </span>
            <CircleCount className="bg-gray-300" count={ endpoints.length }/>
          </div>
        </button>
        <button onClick={ () => setOnlyEnabled(true) }
          className={ `filters-item ${onlyEnabled ? "filters-item-active" : ""}` }>
          <div className="flex items-center space-x-4">
            <span>
              Enabled
            </span>
            <CircleCount className="bg-gray-300" count={ endpoints.filter((e: Endpoint) => e.enabled).length }/>
          </div>
        </button>
      </section>

      <AnimatePresence>
        { applyFilters(endpoints).map(endpoint => (
          <div key={ endpoint.id } className="my-8 bg-slate-700 shadow-lg rounded-xl p-5  ">
            <div className="float-right">
              <EndpointOptions endpoint={ endpoint }/>
            </div>

            <EndpointItem
              endpoint={ endpoint }
              toggleEnable={ (enabled: boolean) => dispatch({
                payload: { enabled, endpointId: endpoint.id },
                type: "update_enabled" }
              ) } />
          </div>
        )) }
      </AnimatePresence>

      <EndpointOptionModals/>
    </div>
  );
};

