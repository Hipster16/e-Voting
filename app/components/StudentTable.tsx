import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
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
import { Checkbox } from "@/components/ui/checkbox";
import { student } from "@/Models/types/student";
import { DataTableProps } from "@/Models/types/tableData";
import { MoveDown, MoveUp } from "lucide-react";

export const dummyData: student[] = [
  {
    id: "1",
    email: "vinubkurup.b21cs1262@mbcet.ac.in",
    clgId: "B21CS1260",
  },
  {
    id: "2",
    email: "ainubkurup.b21cs1262@mbcet.ac.in",
    clgId: "B21CS1261",
  },
  {
    id: "3",
    email: "dinubkurup.b21cs1262@mbcet.ac.in",
    clgId: "B21CS1262",
  },
  {
    id: "4",
    email: "kinubkurup.b21cs1262@mbcet.ac.in",
    clgId: "B21CS1263",
  },
];

export const columns: ColumnDef<student>[] = [
  {
    header: "Select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className=" flex items-center gap-3">
            Id
            {column.getIsSorted() !== "desc" && (
              <MoveUp size={18} color="black" strokeWidth={1} />
            )}
            {column.getIsSorted() === "desc" && (
              <MoveDown size={18} color="black" strokeWidth={1} />
            )}
          </div>
        </button>
      );
    },
    cell: ({ row }) => <p>{row.getValue("id")}</p>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className=" flex items-center gap-3">
            Email
            {column.getIsSorted() !== "desc" && (
              <MoveUp size={18} color="black" strokeWidth={1} />
            )}
            {column.getIsSorted() === "desc" && (
              <MoveDown size={18} color="black" strokeWidth={1} />
            )}
          </div>
        </button>
      );
    },
    cell: ({ row }) => <p>{row.getValue("email")}</p>,
  },
  {
    accessorKey: "clgId",
    header: ({ column }) => {
      return (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className=" flex items-center gap-3">
            Colllege Id
            {column.getIsSorted() !== "desc" && (
              <MoveUp size={18} color="black" strokeWidth={1} />
            )}
            {column.getIsSorted() === "desc" && (
              <MoveDown size={18} color="black" strokeWidth={1} />
            )}
          </div>
        </button>
      );
    },
    cell: ({ row }) => <p>{row.getValue("clgId")}</p>,
  },
];

export default function StudentTable<TData, TValue>({
  columns,
  data,
  onRowSelected,
  Errormsg,
}: DataTableProps<TData, TValue> | any) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });
  useEffect(() => {
    var rowvals: TData[] = [];
    table.getSelectedRowModel().rows.map((row) => {
      rowvals.push(data[Number(row.id)]);
    });
    onRowSelected(rowvals);
  }, [table.getState().rowSelection]);

  return (
    <div className="w-full">
      <input
        placeholder="Filter emails..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="w-[300px] my-5 py-2 px-5 text-md rounded-lg bg-blue-300/10"
      />
      <Table className=" text-black font-medium text-md">
        <TableHeader className="text-xl">
          {table.getHeaderGroups().map((headerGroup) => (
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
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <p className="mt-2 text-sm text-red-600">{Errormsg}</p>
      <h1 className="mt-5 text-xl">Selected</h1>
      <Table>
        <TableBody>
          {table.getSelectedRowModel().rows?.length ? (
            table.getSelectedRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id == "Select") {
                    return;
                  }
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No one selected
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
