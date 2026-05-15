import type { TCellsContainListRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const baseCellsListColumns: ColumnDef<TCellsContainListRow>[] = [
  {
    accessorKey: 'cellName',
    enableResizing: true,
    header: () => <div className="text-center">Ячейка</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.cellName}</div>;
    },
  },
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
    accessorKey: 'lotName',
    header: () => <div className="text-center">Код 1С</div>,
    cell: ({ row }) => {
      return <div className="text-center tabular-nums">{row.original.lotName ?? '-'}</div>;
    },
  },

  {
    accessorKey: 'boilDate',
    header: () => <div className="text-center">Срок годности</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center tabular-nums">
          {row.original.expDate ? format(row.original.expDate, 'dd-MM-yyyy') : '-'}
        </div>
      );
    },
  },
];
