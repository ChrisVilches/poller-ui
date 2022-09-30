import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { NotFound } from "./NotFound";
import { EndpointItemReadonly } from "../components/EndpointItemReadonly";
import { HelmetTitle } from "../components/HelmetTitle";
import { Spinner } from "../components/Spinner";
import { PollingsTable } from "../components/Table/PollingsTable";
import { Endpoint } from "../models/Endpoint";
import { useFindOneEndpointQuery } from "../slices/endpointSlice";

export const Pollings = () => {
  const { endpointId } = useParams();

  const { data: endpoint, isFetching, error } = useFindOneEndpointQuery(Number(endpointId), {
    skip: !endpointId
  });

  if (endpointId) {
    if (isFetching) {
      return <Spinner/>;
    }

    if (error) {
      return <NotFound/>;
    }
  }

  return (
    <>
      <div className="mb-10">
        { endpointId ? (
          <>
            <HelmetTitle subtitles={ ["Activity", endpoint?.title] }/>

            <div className="mb-4">
              <Link to="/pollings"><ChevronLeftIcon className="w-3 h-3 inline"/> See all activity</Link>
            </div>
            <EndpointItemReadonly endpoint={ endpoint as Endpoint } showActivityLink={ false }/>
          </>
        ) : (
          <>
            <HelmetTitle subtitles={ ["Activity"] }/>
            <div className="mb-10">
              Showing all activity
            </div>
          </>
        ) }

      </div>

      <PollingsTable endpointId={ Number(endpointId) } defaultSorting={ { desc: true, id: "createdAt" } }/>
    </>
  );
};
