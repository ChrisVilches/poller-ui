import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import React from "react";

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

export const Table = <T,>({ columns, data }: TableProps<T>) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    }
  });

  return (
    <>
      <table className="w-full">
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
                            ? "cursor-pointer select-none"
                            : "cursor-default select-none",
                          onClick: header.column.getToggleSortingHandler()
                        } }
                      >
                        { flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ) }
                        <span className="float-right mr-2">
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
            <tr key={ row.id }>
              { row.getVisibleCells().map(cell => (
                <td key={ cell.id }>
                  { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                </td>
              )) }
            </tr>
          )) }
        </tbody>
        <tfoot>
          { table.getFooterGroups().map(footerGroup => (
            <tr key={ footerGroup.id }>
              { footerGroup.headers.map(header => (
                <th key={ header.id } colSpan={ header.colSpan }>
                  { header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    ) }
                </th>
              )) }
            </tr>
          )) }
        </tfoot>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-3"
          onClick={ () => table.setPageIndex(0) }
          disabled={ !table.getCanPreviousPage() }
        >
          { "<<" }
        </button>
        <button
          className="border rounded p-3"
          onClick={ () => table.previousPage() }
          disabled={ !table.getCanPreviousPage() }
        >
          { "<" }
        </button>
        <button
          className="border rounded p-3"
          onClick={ () => table.nextPage() }
          disabled={ !table.getCanNextPage() }
        >
          { ">" }
        </button>
        <button
          className="border rounded p-3"
          onClick={ () => table.setPageIndex(table.getPageCount() - 1) }
          disabled={ !table.getCanNextPage() }
        >
          { ">>" }
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            { table.getState().pagination.pageIndex + 1 } of{ " " }
            { table.getPageCount() }
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={ table.getState().pagination.pageIndex + 1 }
            onChange={ e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            } }
            className="border p-1 rounded w-16" />
        </span>
        <select
          value={ table.getState().pagination.pageSize }
          onChange={ e => {
            table.setPageSize(Number(e.target.value));
          } }
        >
          { [10, 20, 30, 40, 50].map(pageSize => (
            <option key={ pageSize } value={ pageSize }>
              Show { pageSize }
            </option>
          )) }
        </select>
      </div>
    </>
  );
};
