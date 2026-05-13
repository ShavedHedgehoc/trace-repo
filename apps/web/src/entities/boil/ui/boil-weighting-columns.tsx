import type { TBoilDetailWeightingRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const baseBoilWeightingColumns: ColumnDef<TBoilDetailWeightingRow>[] = [
  {
    accessorKey: 'code',
    header: () => <div className="text-center">Код</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.code}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: () => <div className="text-center">Наименование</div>,
    cell: ({ row }) => {
      return <div className="text-left">{(row.original.name || row.original.marking) ?? '-'}</div>;
    },
  },

  {
    accessorKey: 'lot',
    header: () => <div className="text-center">Квазипартия</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.lot}</div>;
    },
  },
  {
    accessorKey: 'weight',
    header: () => <div className="text-center">Масса</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.weight ?? '-'}</div>;
    },
  },

  {
    accessorKey: 'user',
    header: () => <div className="text-center">Выполнил</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.user}</div>;
    },
  },
  {
    accessorKey: 'date',
    header: () => <div className="text-center">Дата</div>,
    cell: ({ row }) => {
      const dateObj = row.original.date ? new Date(row.original.date) : null;
      return <div className="text-center">{dateObj ? format(dateObj, 'dd-MM-yyyy') : '-'}</div>;
    },
  },
  {
    accessorKey: 'time',
    header: () => <div className="text-center">Время</div>,
    cell: ({ row }) => {
      const dateObj = row.original.date ? new Date(row.original.date) : null;
      return <div className="text-center">{dateObj ? format(dateObj, 'HH:mm:ss') : '-'}</div>;
    },
  },
];
