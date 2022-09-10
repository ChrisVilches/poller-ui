import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from "@tanstack/react-table";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ResponseCode } from "../components/ResponseCode";
import { Table } from "../components/Table";
import { Endpoint } from "../models/Endpoint";
import { Polling } from "../models/Polling";
import { useFindAllQuery } from "../slices/endpointSlice";
import { useFindPollingsQuery } from "../slices/pollingsSlice";

// TODO: This component is messy (it works though!). Massive refactor needed.

export const Pollings = () => {
  const { data: endpoints, isLoading: loadingEndpoints } = useFindAllQuery();
  
  const { endpointId } = useParams();
  
  const endpointTitle = useCallback((id: number) => endpoints?.find((e: Endpoint) => e.id === id)?.title, [endpoints]);
  
  const { data: pollings = [], refetch, isLoading, isFetching } = useFindPollingsQuery(Number(endpointId));
  
  const defaultColumns: ColumnDef<Polling>[] = useMemo(() => [
    {
      accessorKey: "error",
      cell: info => info.getValue() ? (
        <span className="text-red-500">{ info.getValue() as string }</span> 
      ) : (
        <i className="text-gray-400">None</i>
      ),
      header: "Error"
    },
    {
      accessorKey: "shouldNotify",
      cell: info => info.getValue() ? "YES" : "NO",
      header: "Should notify?"
    },
    {
      accessorKey: "computedMessage",
      header: "Message"
    },
    {
      accessorKey: "responseCode",
      cell: info => <ResponseCode code={ Number(info.getValue()) }/>,
      header: "Response code"
    },
    {
      accessorKey: "manual",
      cell: info => info.getValue() ? "YES" : "NO",
      header: "Manual Trigger"
    },
    {
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
    refetch();
  }, [endpointId, refetch]);

  // Create the table and pass your options
  const table = useReactTable({
    columns: defaultColumns,
    data: pollings,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  // Manage your own state
  const [state, setState] = useState(table.initialState);

  // Override the state managers for the table to your own
  table.setOptions(prev => ({
    ...prev,
    onStateChange: setState,
    state
  }));

  if(isLoading || loadingEndpoints) {
    return <>Loading...</>;
  }

  const allPollings = !endpointId;

  return (
    <div className="p-2">
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

      {isFetching ? "Fetching..." : ""}
      <Table table={ table }/>
    </div>
  );
};
