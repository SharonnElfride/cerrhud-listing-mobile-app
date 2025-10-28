import { displayUserName } from "@/helpers/user_by_id_helper";
import type { Tables } from "@/lib/supabase/supabase";
import { cFormatDate } from "@/utils/formatting";
import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

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
    id: "actions",
    cell: ({ row }) => {
      return (
        enableMasterDetail && (
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
        )
      );
    },
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
    cell: ({ row }) => {
      return (
        <p
          className="underline underline-offset-4 decoration-accent cursor-pointer hover:font-medium transition-all duration-300"
          onClick={() => {
            // open view modal
          }}
        >
          {row.original.title}
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Prix",
    meta: { filterType: "number" },
  },
  {
    accessorKey: "keywords",
    header: "Mots clés",
    cell: ({ row }) => {
      return (
        <div className="w-[350px] flex flex-wrap items-center gap-1">
          {row.original.keywords?.map((kw) => (
            <Badge variant={"outline"} className="capitalize">
              {kw}
            </Badge>
          ))}
        </div>
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "created_at",
    header: "Créé le",
    // header: ({ column }) => {
    //   return (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Créé le
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   );
    // },
    cell: ({ row }) => {
      return <p>{cFormatDate(row.original.created_at!)}</p>;
    },
    meta: { filterType: "date" },
  },
  {
    accessorKey: "created_by",
    header: "Créé par",
    cell: ({ row }) => {
      return <p>{displayUserName(row.original.id)}</p>;
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "updated_at",
    header: "Mis à jour le",
    cell: ({ row }) => {
      return <p>{cFormatDate(row.original.updated_at!)}</p>;
    },
    meta: { filterType: "date" },
  },
  {
    accessorKey: "updated_by",
    header: "Mis à jour par",
    cell: ({ row }) => {
      return <p>{displayUserName(row.original.id)}</p>;
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
];
