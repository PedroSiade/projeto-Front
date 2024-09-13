import { CellContext } from "@tanstack/react-table";
import { ClientsTableRow } from "@/details/clients/table/config";

export function NameCell({ row }: CellContext<ClientsTableRow, unknown>) {
  const name = row.original.name;
  return <span>{name}</span>;
}
export function OperatorCell({ row }: CellContext<ClientsTableRow, unknown>) {
  const name = row.original.operator?.name;
  return <span>{name}</span>;
}

export function EmailCell({ row }: CellContext<ClientsTableRow, unknown>) {
  const email = row.original.email;
  return <span>{email}</span>;
}

export function BornDateCell({ row }: CellContext<ClientsTableRow, unknown>) {
  let birthDate = row.original.birthDate;
  birthDate = new Date(birthDate);
  birthDate = birthDate?.toLocaleDateString();
  return <span>{birthDate}</span>;
}

export function ValueCell({ row }: CellContext<ClientsTableRow, unknown>) {
  const value = row.original.value;
  return <span>{value}</span>;
}
