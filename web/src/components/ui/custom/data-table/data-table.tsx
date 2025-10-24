import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../input-group";
import { CEmptyData, type CEmptyDataProps } from "../cempty-data";
import { DataTablePagination } from "./pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  appRoute,
  addDataButtonText,
  addDataButtonOnClick,
  canAccessMoreButton = false,
}: DataTableProps<TData, TValue> & CEmptyDataProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });

  // const rerender = () => setData(() => makeData(5000))

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnPinning,
    },
    initialState: {
      columnPinning: {
        left: ["select", "title"],
        right: ["actions"],
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
  });

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table className="scroll-smooth">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={`filter-${headerGroup.id}`}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={`filter-${header.id}`}
                        //   className={
                        //     header.column.getCanPin() &&
                        //     header.column.getIsPinned() !== false
                        //       ? "sticky"
                        //       : ""
                        //   }
                      >
                        {header.column.getCanFilter() && (
                          <InputGroup className="min-w-[100px] border-none shadow-none h-full">
                            <InputGroupInput
                              placeholder="Search..."
                              value={
                                (table
                                  .getColumn(header.column.id)
                                  ?.getFilterValue() as string) ?? ""
                              }
                              onChange={(event) =>
                                table
                                  .getColumn(header.column.id)
                                  ?.setFilterValue(event.target.value)
                              }
                              className="!px-1 !text-xs"
                            />
                            <InputGroupAddon className="pl-1 py-0">
                              <Search size={5} />
                            </InputGroupAddon>
                          </InputGroup>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <CEmptyData
                    appRoute={appRoute}
                    addDataButtonText={addDataButtonText}
                    addDataButtonOnClick={addDataButtonOnClick}
                    canAccessMoreButton={canAccessMoreButton}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />
    </div>
  );
}
