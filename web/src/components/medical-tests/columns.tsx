import { useAuth } from "@/context/AuthContext";
import type { Tables } from "@/lib/supabase/supabase";
import { hasRequiredPermissions } from "@/navigation/guards";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  EditIcon,
  EyeIcon,
  MoreHorizontal,
  Trash2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const MedicalTestsColumns = (
  enableMasterDetail?: boolean
): ColumnDef<Tables<"medical_tests">>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "acronym",
    header: "Acronyme",
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: "Titre",
    enableSorting: false,
  },
  {
    accessorKey: "price",
    header: "Prix",
  },
  {
    accessorKey: "keywords",
    header: "Mots clés",
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Créé le
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: "created_by",
    header: "Créé par",
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "updated_at",
    header: "Mis à jour le",
    enableColumnFilter: false,
  },
  {
    accessorKey: "updated_by",
    header: "Mis à jour par",
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const medicalTest = row.original;
      const { userPermissions } = useAuth();

      return (
        <>
          <div className="hidden md:flex">
            <ButtonGroup>
              <Button variant="outline" size="icon-sm">
                <EyeIcon />
              </Button>
              {hasRequiredPermissions(userPermissions, [
                "medical_tests.update",
              ]) && (
                <Button variant="outline" size="icon-sm">
                  <EditIcon />
                </Button>
              )}
              {hasRequiredPermissions(userPermissions, [
                "medical_tests.delete",
              ]) && (
                <Button variant="destructive" size="icon-sm">
                  <Trash2Icon />
                </Button>
              )}

              {enableMasterDetail && (
                <Button
                  variant="secondary"
                  size="icon-sm"
                  onClick={() => row.toggleExpanded()}
                >
                  <ChevronDown
                    className={`transition-transform ${
                      row.getIsExpanded() ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              )}
            </ButtonGroup>
          </div>

          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(medicalTest.id)}
                >
                  Copy medical test's ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View medical test's details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      );
    },
  },
];
