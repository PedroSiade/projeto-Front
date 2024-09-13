import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { TableHead, TableRow } from "@/components/ui/table";
import { ClientsTableRow } from "@/details/clients/table/config";
import { cn } from "@/lib/utils";

export interface ClientsTableHeaderData {
  headerGroup: HeaderGroup<ClientsTableRow>;
}

export function ClientTableHeader({ headerGroup }: ClientsTableHeaderData) {
  return (
    <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
      {headerGroup.headers.map((header) => {
        return (
          <TableHead
            key={header.id}
            className={cn("text-foreground bg-secondary")}
          >
            <div className={cn("flex items-center justify-between uppercase ")}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </div>
          </TableHead>
        );
      })}
    </TableRow>
  );
}
