"use client";
import { ClientssTableRow } from "@/details/clients/table/RowTable";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ClientsTableRow, columns } from "@/details/clients/table/config";
import { ClientTableHeader } from "@/details/clients/table/HeadTable";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Client {
  name: string;
  birthDate: string | Date;
  value: number;
  email: string;
  operator: {
    name: string;
  };
}
const fetchData = async () => {
  try {
    const response: AxiosResponse<Client[]> = await axios.get(
      "http://localhost:8080/cliente/",
    );
    console.log("Dados recebidos:", response.data);
    return response.data;
  } catch (error) {
    return null;
  }
};

export default function ClientsTable() {
  const { data: clientList } = useQuery({
    queryKey: ["clients"],
    queryFn: () => {
      return fetchData();
    },
  });

  const table = useReactTable<ClientsTableRow>({
    data: [...(clientList ?? [])],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getSortedRowModel: getSortedRowModel(),
  });
  if (!clientList) return <></>;

  const rowModel = table.getRowModel();

  return (
    <div
      className={
        "flex h-full flex-col gap-y-3 rounded-lg bg-background-secondary  md:overflow-hidden"
      }
    >
      <Table className={"h-full w-full overflow-hidden rounded-lg"}>
        <TableHeader className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <ClientTableHeader key={headerGroup.id} headerGroup={headerGroup} />
          ))}
        </TableHeader>
        <TableBody className={""}>
          {rowModel.rows.length ? (
            rowModel.rows.map((row) => (
              <ClientssTableRow key={row.id} row={row} />
            ))
          ) : (
            <TableRow className="!border-t-2 border-t-background-secondary bg-gray-500">
              <TableCell colSpan={columns.length}>
                <div className="grid items-center justify-center">
                  <p>Nenhum resultado encontrado.</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
