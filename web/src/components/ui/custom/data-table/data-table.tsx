import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
import { type ReactNode, useState } from "react";
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
  enableMasterDetail?: boolean;
  masterDetail?: (row: TData) => ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  appRoute,
  addDataButtonText,
  addDataButtonOnClick,
  canAccessMoreButton = false,
  enableMasterDetail = false,
  masterDetail,
}: DataTableProps<TData, TValue> & CEmptyDataProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });

  const [expanded, setExpanded] = useState<ExpandedState>({});
  // const rerender = () => setData(() => makeData(5000))

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnPinning,
      expanded,
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
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
  });

  return (
    <div>
      <div className="rounded-md border overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          position:
                            header.column.getIsPinned() === "left" ||
                            header.column.getIsPinned() === "right"
                              ? "sticky"
                              : undefined,
                          left:
                            header.column.getIsPinned() === "left"
                              ? `${header.column.getStart("left") ?? 0}px`
                              : undefined,
                          right:
                            header.column.getIsPinned() === "right"
                              ? `${header.column.getAfter("right") ?? 0}px`
                              : undefined,
                          zIndex:
                            header.column.getIsPinned() === "left" ||
                            header.column.getIsPinned() === "right"
                              ? 10
                              : undefined,
                          background: "inherit",
                        }}
                      >
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
                        style={{
                          position:
                            header.column.getIsPinned() === "left" ||
                            header.column.getIsPinned() === "right"
                              ? "sticky"
                              : undefined,
                          left:
                            header.column.getIsPinned() === "left"
                              ? `${header.column.getStart("left") ?? 0}px`
                              : undefined,
                          right:
                            header.column.getIsPinned() === "right"
                              ? `${header.column.getAfter("right") ?? 0}px`
                              : undefined,
                          zIndex:
                            header.column.getIsPinned() === "left" ||
                            header.column.getIsPinned() === "right"
                              ? 10
                              : undefined,
                          background: "inherit",
                        }}
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
                <>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          position:
                            cell.column.getIsPinned() === "left" ||
                            cell.column.getIsPinned() === "right"
                              ? "sticky"
                              : undefined,
                          left:
                            cell.column.getIsPinned() === "left"
                              ? `${cell.column.getStart("left") ?? 0}px`
                              : undefined,
                          right:
                            cell.column.getIsPinned() === "right"
                              ? `${cell.column.getAfter("right") ?? 0}px`
                              : undefined,
                          zIndex:
                            cell.column.getIsPinned() === "left" ||
                            cell.column.getIsPinned() === "right"
                              ? 10
                              : undefined,
                          background: "inherit",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {enableMasterDetail && row.getIsExpanded() && (
                    <TableRow className="bg-base-200/30 transition-all duration-300 ease-in-out">
                      <TableCell
                        colSpan={columns.length + 1}
                      >
                        {masterDetail && masterDetail(row.original)}
                      </TableCell>
                    </TableRow>
                  )}
                </>
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
