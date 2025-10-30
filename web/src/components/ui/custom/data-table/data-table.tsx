import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FilterType } from "@/shared/DataTableFilterType";
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
  Edit3Icon,
  ListPlusIcon,
  RefreshCwIcon,
  Search,
  Trash2Icon,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "../../button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../input-group";
import { CEmptyData, type CEmptyDataProps } from "../cempty-data";
import DeleteDialog from "./delete-dialog";
import EditSheet from "./edit-sheet";
import { DataTablePagination } from "./pagination";

interface TableButtons {
  refreshFunction: () => void;
  canAdd?: boolean;
  addFunction?: () => void;
  canEdit?: boolean;
  canDelete?: boolean;
  deleteFunction?: (ids: string[]) => Promise<void>;
}

interface EditSheetProps<TData> {
  sheetTitle: string;
  sheetDescription: string;
  sheetContent: (row: TData) => ReactNode;
}

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
  refreshFunction,
  canAdd = false,
  addFunction,
  canEdit = false,
  canDelete = false,
  deleteFunction,
  sheetTitle,
  sheetDescription,
  sheetContent,
}: DataTableProps<TData, TValue> &
  EditSheetProps<TData> &
  CEmptyDataProps &
  TableButtons) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [openSheet, setOpenSheet] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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
        left: ["select", "actions", "title"],
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
    <div className="space-y-5">
      {/* Add button group here for: NEW (sheet), EDIT (sheet), DELETE (modal), REFRESH (with button & toltip) - Edit when only one seleted & Delete when one/+ selected */}
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          {canAdd && addFunction && (
          // {canAdd && addForm && (
            <Button size={"sm"} onClick={addFunction}>
              <ListPlusIcon />
              <p>Ajouter</p>
            </Button>
          )}

          {canEdit && (
            // {canEdit && editForm && (
            <Button
              size={"sm"}
              onClick={() => setOpenSheet(true)}
              disabled={Object.keys(rowSelection).length !== 1}
            >
              <Edit3Icon />
              <p>Éditer</p>
            </Button>
          )}

          {canDelete && deleteFunction && (
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={() => setOpenDialog(true)}
              disabled={!table.getIsSomeRowsSelected()}
            >
              <Trash2Icon />
              <p>Supprimer</p>
            </Button>
          )}
        </div>

        <Button size={"sm"} onClick={refreshFunction}>
          <RefreshCwIcon />
          <p>Rafraîchir</p>
        </Button>
      </div>

      <div className="rounded-md border overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]">
        <Table className="min-w-full bg-background">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} data-col={header.column.id}>
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
                    const filterType = (header.column.columnDef.meta as any)
                      ?.filterType as FilterType;

                    return (
                      <TableHead
                        key={`filter-${header.id}`}
                        data-col={header.column.id}
                      >
                        {header.column.getCanFilter() && (
                          <InputGroup className="min-w-[100px] border-none shadow-none h-full">
                            {filterType === "number" && (
                              <InputGroupInput
                                type="number"
                                value={
                                  (table
                                    .getColumn(header.column.id)
                                    ?.getFilterValue() as string) ?? undefined
                                }
                                onChange={(e) => {
                                  return table
                                    .getColumn(header.column.id)
                                    ?.setFilterValue(e.target.value);
                                }}
                                placeholder="0"
                                className="!px-1 !text-xs"
                              />
                            )}

                            {filterType === "boolean" && (
                              <select
                                className="border rounded px-1 py-0.5 text-xs"
                                value={
                                  (table
                                    .getColumn(header.column.id)
                                    ?.getFilterValue() as string) ?? ""
                                }
                                onChange={(e) =>
                                  table
                                    .getColumn(header.column.id)
                                    ?.setFilterValue(e.target.value === "true")
                                }
                              >
                                <option value="">All</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                              </select>
                            )}

                            {filterType === "date" && (
                              <InputGroupInput
                                type="date"
                                value={
                                  (table
                                    .getColumn(header.column.id)
                                    ?.getFilterValue() as string) ?? ""
                                }
                                onChange={(e) =>
                                  table
                                    .getColumn(header.column.id)
                                    ?.setFilterValue(e.target.value)
                                }
                                className="!px-1 !text-xs"
                              />
                            )}

                            {filterType === "select" &&
                              header.column.columnDef.meta &&
                              Array.isArray(
                                (header.column.columnDef.meta as any)?.options
                              ) && (
                                <select
                                  className="border rounded px-1 py-0.5 text-xs"
                                  value={
                                    (table
                                      .getColumn(header.column.id)
                                      ?.getFilterValue() as string) ?? ""
                                  }
                                  onChange={(e) =>
                                    table
                                      .getColumn(header.column.id)
                                      ?.setFilterValue(e.target.value)
                                  }
                                >
                                  <option value="">All</option>
                                  {(
                                    header.column.columnDef.meta as any
                                  ).options.map((opt: string) => (
                                    <option key={opt} value={opt}>
                                      {opt}
                                    </option>
                                  ))}
                                </select>
                              )}

                            {(!filterType || filterType === "text") && (
                              <>
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
                              </>
                            )}
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
                      <TableCell key={cell.id} data-col={cell.column.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {enableMasterDetail && row.getIsExpanded() && (
                    <TableRow className="bg-base-200/30 transition-all duration-300 ease-in-out">
                      <TableCell colSpan={columns.length + 1}>
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

      {table.getIsSomePageRowsSelected() && (
        <>
          <EditSheet
            openSheet={openSheet}
            onOpenChange={setOpenSheet}
            sheetTitle={sheetTitle}
            sheetDescription={sheetDescription}
          >
            {sheetContent(table.getRow(Object.keys(rowSelection)[0]).original)}
          </EditSheet>

          {deleteFunction && (
            <DeleteDialog
              openDialog={openDialog}
              onOpenChange={(open) => {
                if (isUpdating) return;
                setOpenDialog(open);
              }}
              isUpdating={isUpdating}
              deleteFunction={async () => {
                setIsUpdating(true);
                let idsToDelete = Object.keys(rowSelection).map(
                  (key) => (table.getRow(key).original as any).id as string
                );

                await deleteFunction(idsToDelete);
                setIsUpdating(false);
                setOpenDialog(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
