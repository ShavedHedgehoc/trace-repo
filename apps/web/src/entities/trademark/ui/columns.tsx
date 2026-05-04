import type { TTrademarkListRow } from "@repo/trpc";
import type { ColumnDef } from "@tanstack/react-table";

export const baseTrademarkColumns: ColumnDef<TTrademarkListRow>[] = [
    {
        accessorKey: "trademarkName",
        header: () => <div className="text-left pl-6">Торговое название</div>,
        cell: ({ row }) => {
            return <div className="text-left pl-6">{row.original.trademarkName}</div>;
        },
    },
    {
        accessorKey: "barcode",
        header: () => <div className="text-center">Код 1С</div>,
        cell: ({ row }) => {
            return <div className="text-center tabular-nums">{row.original.productId}</div>;
        },
    },
    {
        accessorKey: "rank_id",
        header: () => <div className="text-center">Наименование</div>,
        cell: ({ row }) => {
            return <div className="text-left">{row.original.productName}</div>;
        },
    }
];