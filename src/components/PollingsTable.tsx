import { CheckBadgeIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  ColumnDef,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import { ResponseCode } from "./ResponseCode";
import { Polling } from "../models/Polling";
import { useFindPollingsQuery } from "../slices/pollingsSlice";

export interface PollingsPaginatedResult {
  count: number;
  data: Polling[];
}

interface PollingsTableProps {
  defaultSorting: { id: string, desc: boolean };
  endpointId: number | undefined;
}

const truncateString = (text: string) => {
  if (text.length > 40) {
    return text.substring(0, 40) + "...";
  }

  return text;
};

const MessageCell = ({ message, error }: { message: string, error?: string}) => {
  if (message) {
    return <div>{ message }</div>;
  }

  if (error) {
    // Heuristic to improve the error message.
    if (error.includes("net::ERR_NAME_NOT_RESOLVED") || error.includes("getaddrinfo EAI_AGAIN")) {
      error = "Network Error";
    }
    return <span className="text-red-500">{ truncateString(error) }</span>; 
  }

  return <i className="text-gray-400">None</i>;
};

// TODO: Move to some folder for storing constant data like this. There's some other data like in the
//       rules configuration components.
const columns: ColumnDef<Polling>[] = [
  {
    accessorKey: "responseCode",
    cell: info => <ResponseCode code={ Number(info.getValue()) }/>,
    header: "Response code"
  },
  {
    accessorKey: "shouldNotify",
    cell: info => info.getValue() ? (
      <CheckIcon className="text-green-500 mx-auto w-6 h-6"/>
    ) : (
      <MinusIcon className="text-gray-600 mx-auto w-6 h-6"/>
    ),
    header: "Should notify?"
  },
  {
    cell: info => {
      const { error, computedMessage } = info.row.original;
      return <MessageCell message={ computedMessage } error={ error }/>;
    },
    header: "Message"
  },
  {
    accessorKey: "manual",
    cell: info => info.getValue() ? "Manual" : "Automated",
    header: "Manual Trigger"
  },
  {
    accessorKey: "createdAt",
    cell: info => <TimeAgo date={ info.getValue() }/>,
    header: "Date"
  },
  {
    cell: info => {
      const { endpoint } = info.row.original;
      return <Link to={ `/pollings/${endpoint.id}` }>{ truncateString(endpoint.title) }</Link>;
    },
    header: "Endpoint"
  }
];

export const PollingsTable = ({ endpointId, defaultSorting }: PollingsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([defaultSorting]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const { isFetching, data = { data: [] as Polling[], count: 0 } } = useFindPollingsQuery({
    id: endpointId,
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    order: (sorting[0] || defaultSorting).desc ? "desc" : "asc",
    sortBy: (sorting[0] || defaultSorting).id
  });

  const table = useReactTable({
    columns,
    data: data.data,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    pageCount: Math.ceil(data.count / pagination.pageSize),
    manualPagination: true,
    state: {
      pagination,
      sorting
    }
  });

  return (
    <>
      <table className={ `w-full bg-slate-700 pollings-table mb-6 ${isFetching ? "pollings-table-loading" : ""}` }>
        <thead>
          { table.getHeaderGroups().map(headerGroup => (
            <tr key={ headerGroup.id }>
              { headerGroup.headers.map(header => {
                return (
                  <th key={ header.id } colSpan={ header.colSpan }>
                    { header.isPlaceholder ? null : (
                      <button
                        type="button"
                        { ...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none w-full"
                            : "cursor-default select-none w-full",
                          onClick: header.column.getToggleSortingHandler()
                        } }
                      >
                        { flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ) }
                        <span className="float-right w-0">
                          { {
                            asc: <ChevronUpIcon className="w-4 h-4" />,
                            desc: <ChevronDownIcon className="w-4 h-4" />
                          }[header.column.getIsSorted() as string] ?? null }
                        </span>
                      </button>
                    ) }
                  </th>
                );
              }) }
            </tr>
          )) }
        </thead>
        <tbody>
          { table.getRowModel().rows.map(row => (
            <tr key={ row.id } data-polling-id={row.original.id}>
              { row.getVisibleCells().map(cell => (
                <td key={ cell.id }>
                  { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                </td>
              )) }
            </tr>
          )) }
        </tbody>
      </table>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1 place-self-center md:place-self-end space-x-2">
          <button
            className="btn btn-smaller btn-secondary"
            onClick={ () => table.setPageIndex(0) }
            disabled={ !table.getCanPreviousPage() }
          >
            { "<<" }
          </button>
          <button
            className="btn btn-smaller btn-secondary"
            onClick={ () => table.previousPage() }
            disabled={ !table.getCanPreviousPage() }
          >
            { "<" }
          </button>
          <button
            className="btn btn-smaller btn-secondary"
            onClick={ () => table.nextPage() }
            disabled={ !table.getCanNextPage() }
          >
            { ">" }
          </button>
          <button
            className="btn btn-smaller btn-secondary"
            onClick={ () => table.setPageIndex(table.getPageCount() - 1) }
            disabled={ !table.getCanNextPage() }
          >
            { ">>" }
          </button>
        </div>
        <div className="col-span-2 md:col-span-1 place-self-center md:place-self-start">
          <div className="inline mr-4">
            Page{" "}
            <strong>
              { table.getState().pagination.pageIndex + 1 } of{ " " }
              { table.getPageCount() }
            </strong>
          </div>
          <select
            className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={ pagination.pageSize }
            onChange={ e => {
              setPagination((state: PaginationState) => ({
                ...state,
                pageSize: +e.target.value
              }));
            } }
          >
            { [10, 20, 30, 40, 50].map(pageSize => (
              <option key={ pageSize } value={ pageSize }>
                Show { pageSize }
              </option>
            )) }
          </select>
        </div>
      </div>
    </>
  );
};
