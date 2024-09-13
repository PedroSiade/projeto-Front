"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  BornDateCell,
  EmailCell,
  NameCell,
  OperatorCell,
  ValueCell,
} from "@/details/clients/table/custom-cells";
import { Client } from "@/details/clients/table/index";

export type ClientsTableData = Client[];
export type ClientsTableRow = ClientsTableData[number];

const columnHelper = createColumnHelper<ClientsTableRow>();

export type ClientsTableValue = string;

export type ClientsTableColumnsDefinition = ({
  accessorKey?: string;
} & ColumnDef<ClientsTableRow, ClientsTableValue>)[];

export const columns: ClientsTableColumnsDefinition = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Nome",
    cell: NameCell,
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
    cell: EmailCell,
  }),
  columnHelper.accessor("birthDate", {
    id: "nascimento",
    header: "Data de Nascimento",
    cell: BornDateCell,
  }),
  columnHelper.display({
    id: "value",
    header: "Valor",
    cell: ValueCell,
  }),
  columnHelper.display({
    id: "operator",
    header: "Operador",
    cell: OperatorCell,
  }),
];
