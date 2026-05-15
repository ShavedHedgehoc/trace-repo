import type { TMaterialsListRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';

export const baseMaterialListColumns: ColumnDef<TMaterialsListRow>[] = [
  {
    accessorKey: 'productId',
    header: () => <div className="text-center">Код 1С</div>,
    cell: ({ row }) => {
      return <div className="text-center tabular-nums">{row.original.productId ?? '-'}</div>;
    },
  },
  {
    accessorKey: 'productName',
    header: () => <div className="text-center">Наименование</div>,
    meta: { grow: true },
    cell: ({ row }) => {
      return <div className="text-left">{row.original.productName ?? '-'}</div>;
    },
  },
  {
    accessorKey: 'lotCount',
    header: () => <div className="text-center">Квазипартий</div>,
    cell: ({ row }) => {
      return <div className="text-center tabular-nums">{row.original.lotCount ?? '-'}</div>;
    },
  },

  {
    accessorKey: 'boilCount',
    header: () => <div className="text-center">Варок</div>,
    cell: ({ row }) => {
      return <div className="text-center tabular-nums">{row.original.boilCount ?? '-'}</div>;
    },
  },
];
