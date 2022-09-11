import {
  ColumnDef
} from "@tanstack/react-table";
import React, { useCallback, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { EndpointItemReadonly } from "../components/EndpointItemReadonly";
import { ResponseCode } from "../components/ResponseCode";
import { Table } from "../components/Table";
import { Endpoint } from "../models/Endpoint";
import { Polling } from "../models/Polling";
import { useFindAllEndpointsQuery } from "../slices/endpointSlice";
import { useFindPollingsQuery } from "../slices/pollingsSlice";

// TODO: This component is messy (it works though!). Massive refactor needed.

export const Pollings = () => {
  const { data: endpoints, isFetching: fetchingEndpoints, refetch: refetchEndpoints } = useFindAllEndpointsQuery();
  
  const { endpointId } = useParams();
  
  const endpointTitle = useCallback((id: number) => endpoints?.find((e: Endpoint) => e.id === id)?.title, [endpoints]);
  
  const { data: pollings = [], refetch, isLoading, isFetching } = useFindPollingsQuery(Number(endpointId));
  
  const columns: ColumnDef<Polling>[] = useMemo(() => [
    {
      accessorKey: "responseCode",
      cell: info => <ResponseCode code={ Number(info.getValue()) }/>,
      header: "Response code"
    },
    {
      accessorKey: "shouldNotify",
      cell: info => info.getValue() ? "YES" : "NO",
      header: "Should notify?"
    },
    {
      cell: info => {
        const { error, computedMessage } = info.row.original;

        if (computedMessage) {
          return <div>{ computedMessage }</div>;
        }

        if (error) {
          return <span className="text-red-500">{ error }</span>; 
        }

        return <i className="text-gray-400">None</i>;
      },
      header: "Message"
    },
    {
      accessorKey: "manual",
      cell: info => info.getValue() ? "YES" : "NO",
      header: "Manual Trigger"
    },
    {
      // TODO: Add the sorting by default on this column.
      accessorKey: "createdAt",
      cell: info => (new Date(info.getValue() as string)).toLocaleString(),
      header: "Date"
    },
    {
      accessorKey: "endpointId",
      cell: info => <Link to={ `/pollings/${info.getValue()}` }>{ endpointTitle(info.getValue() as number) }</Link>,
      header: "Endpoint"
    }
  ], [endpointTitle]);

  useEffect(() => {
    refetchEndpoints();
    refetch();
  }, [endpointId, refetch, refetchEndpoints]);


  if(isLoading || fetchingEndpoints) {
    return <>Loading...</>;
  }

  const allPollings = !endpointId;

  const endpoint: Endpoint | undefined = endpoints?.find((e: Endpoint) => e.id === Number(endpointId));

  if(!allPollings && !endpoint) {
    return <>Not found</>;
  }

  return (
    <div className="p-2">
      { !allPollings ? (
        <EndpointItemReadonly endpoint={ endpoint! } showActivityLink={ false }/>
      ) : <></> }

      { allPollings ? (
        <div>
          All Activity
        </div>
      ) : (
        <div>
          { endpointTitle(Number(endpointId)) }
          <Link to="/pollings">(See all)</Link>
        </div>
      ) }

      { isFetching ? "Fetching..." : "" }
      <Table<Polling> data={ pollings } columns={ columns }/>
    </div>
  );
};
