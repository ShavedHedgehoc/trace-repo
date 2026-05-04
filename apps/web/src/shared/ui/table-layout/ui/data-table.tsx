

import { cn } from "@/shared/lib";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/shared/ui";
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    getRowClassName?: (row: TData) => string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    getRowClassName,
}: DataTableProps<TData, TValue>) {
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup, groupIndex) => (
                        <TableRow key={headerGroup.id} className={cn("border-b-0")}>
                            {headerGroup.headers.map((header) => {
                                const isGroup = header.column.getLeafColumns().length > 1;
                                const isSingle = !header.column.parent && !isGroup;

                                if (groupIndex === 1 && isSingle) return null;

                                const rowSpan = isSingle && groupIndex === 0 ? 2 : 1;
                                return (
                                    <TableHead
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        rowSpan={rowSpan}
                                        className={cn(
                                            "text-center align-middle  bg-muted/20",
                                            "h-auto py-2",
                                            groupIndex === 0 && isGroup ? "border-b-0" : "border-b",
                                        )}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
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
                                className={cn(getRowClassName?.(row.original))}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Записи не найдены...
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}