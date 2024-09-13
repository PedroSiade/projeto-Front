import { Row, flexRender } from '@tanstack/react-table';
import {TableCell, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {ClientsTableRow} from "@/details/clients/table/config";

export interface ClientsTableRowProps {
	row: Row<ClientsTableRow>;
}

export function ClientssTableRow({ row }: ClientsTableRowProps) {
	return (
		<TableRow
			data-state={row.getIsSelected() && 'selected'}
			className="!border-t-2 border-t-background-secondary bg-slate-100"
		>
			{row.getVisibleCells().map(cell => {

				return (
					<TableCell
						key={cell.id}
						className={cn('box-content h-[20px] text-chat-card-foreground')}
					>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</TableCell>
				);
			})}
		</TableRow>
	);
}
