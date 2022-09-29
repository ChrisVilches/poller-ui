import { PaginationState, Table } from "@tanstack/react-table";
import React from "react";
import { Polling } from "../../models/Polling";

interface TableFooterProps {
  table: Table<Polling>;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export const TableFooter = ({
  table,
  pagination,
  setPagination
}: TableFooterProps) => (
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
        Page{ " " }
        <strong>
          { table.getState().pagination.pageIndex + 1 } of{ " " }
          { table.getPageCount() }
        </strong>
      </div>
      <select
        className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500"
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
);
