import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { PaginationState, SortingState, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useState } from "react";
import { columns } from "./columns";
import { TableFooter } from "./TableFooter";
import { Polling } from "../../models/Polling";
import { useFindPollingsQuery } from "../../slices/pollingsSlice";

interface PollingsTableProps {
  defaultSorting: { id: string, desc: boolean };
  endpointId: number | undefined;
}

export const PollingsTable = ({ endpointId, defaultSorting }: PollingsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([defaultSorting]);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const { isFetching, data = { count: 0, data: [] as Polling[] } } = useFindPollingsQuery({
    id: endpointId,
    order: (sorting[0] || defaultSorting).desc ? "desc" : "asc",
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortBy: (sorting[0] || defaultSorting).id
  });

  const table = useReactTable({
    columns,
    data: data.data,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    pageCount: Math.ceil(data.count / pagination.pageSize),
    state: {
      pagination,
      sorting
    }
  });

  return (
    <>
      <div className="overflow-x-auto mb-6">
        <table className={ `w-full bg-slate-700 pollings-table ${isFetching ? "pollings-table-loading" : ""}` }>
          <thead>
            { table.getHeaderGroups().map(headerGroup => (
              <tr key={ headerGroup.id }>
                { headerGroup.headers.map(header => (
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
                        { flexRender(header.column.columnDef.header, header.getContext()) }
                        <span className="float-right w-0">
                          { {
                            asc: <ChevronUpIcon className="w-4 h-4" />,
                            desc: <ChevronDownIcon className="w-4 h-4" />
                          }[header.column.getIsSorted() as string] ?? null }
                        </span>
                      </button>
                    ) }
                  </th>
                )) }
              </tr>
            )) }
          </thead>
          <tbody>
            { table.getRowModel().rows.map(row => (
              <tr key={ row.id } data-polling-id={ row.original.id }>
                { row.getVisibleCells().map(cell => (
                  <td key={ cell.id }>
                    { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                  </td>
                )) }
              </tr>
            )) }
          </tbody>
        </table>
      </div>

      <TableFooter table={ table } pagination={ pagination } setPagination={ setPagination }/>
    </>
  );
};
