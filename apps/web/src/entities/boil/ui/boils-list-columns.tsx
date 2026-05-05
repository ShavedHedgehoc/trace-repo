
import { mapPlants } from '@/shared/lib';
import type { TBoilListRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from "date-fns"

export const baseBoilsListColumns: ColumnDef<TBoilListRow>[] = [
    {
        accessorKey: 'boilName',
        enableResizing: true,
        header: () => <div className="text-center">Варка</div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.batchName}</div>;
        },
    },
    {
        accessorKey: 'boilDate',
        header: () => <div className="text-center">Дата</div>,
        cell: ({ row }) => {
            return <div className="text-center tabular-nums">{row.original.boilDate ? format(row.original.boilDate, "dd-MM-yyyy") : "-"}</div>;
        },
    },
    {
        accessorKey: 'plant',
        header: () => <div className="text-center">Площадка</div>,
        cell: ({ row }) => {
            return <div className="text-center">{mapPlants(row.original.plantAbb) ?? "-"}</div>;
        },
    },
    {
        accessorKey: 'productId',
        header: () => <div className="text-center">Код 1С</div>,
        cell: ({ row }) => {
            return <div className="text-center tabular-nums">{row.original.productId ?? "-"}</div>;
        },
    },
    {
        accessorKey: 'productMarking',
        header: () => <div className="text-center">Артикул</div>,
        cell: ({ row }) => {
            return <div className="text-center">{row.original.productMarking ?? "-"}</div>;
        },
    },



];
