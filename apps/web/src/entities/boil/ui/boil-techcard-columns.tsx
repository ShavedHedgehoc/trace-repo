import { cn } from '@/shared/lib';
import type { TBoilDetailTechCardRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const baseBoilTechCardColumns: ColumnDef<TBoilDetailTechCardRow>[] = [
  {
    accessorKey: 'code',
    header: () => <div className="text-center">Код</div>,
    cell: ({ row }) => {
      return (
        <div className={cn('text-center', row.original.isOperation && 'font-black')}>
          {row.original.code}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: () => <div className="text-center">Наименование</div>,
    cell: ({ row }) => {
      return (
        <div className={cn('text-left', row.original.isOperation && 'font-black')}>
          {row.original.name}
        </div>
      );
    },
  },

  {
    accessorKey: 'lot',
    header: () => <div className="text-center">Квазипартия</div>,
    cell: ({ row }) => {
      return (
        <div className={cn('text-center', row.original.isOperation && 'font-black')}>
          {row.original.lot}
        </div>
      );
    },
  },
  {
    accessorKey: 'weight',
    header: () => <div className="text-center">Масса</div>,
    cell: ({ row }) => {
      return (
        <div className={cn('text-center', row.original.isOperation && 'font-black')}>
          {row.original.weight ?? '-'}
        </div>
      );
    },
  },

  {
    accessorKey: 'temp',
    header: () => <div className="text-center">Температура</div>,
    cell: ({ row }) => {
      return (
        <div className={cn('text-center', row.original.isOperation && 'font-black')}>
          {row.original.temp ?? '-'}
        </div>
      );
    },
  },

  {
    accessorKey: 'user',
    header: () => <div className="text-center">Выполнил</div>,
    cell: ({ row }) => {
      return (
        <div className={cn('text-center', row.original.isOperation && 'font-black')}>
          {row.original.user}
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    header: () => <div className="text-center">Дата</div>,
    cell: ({ row }) => {
      const dateObj = row.original.date ? new Date(row.original.date) : null;
      return (
        <div className={cn('text-center', row.original.isOperation && 'font-black')}>
          {dateObj ? format(dateObj, 'dd-MM-yyyy') : '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'time',
    header: () => <div className="text-center">Время</div>,
    cell: ({ row }) => {
      const dateObj = row.original.date ? new Date(row.original.date) : null;
      return (
        <div className={cn('text-center', row.original.isOperation && 'font-black')}>
          {dateObj ? format(dateObj, 'HH:mm:ss') : '-'}
        </div>
      );
    },
  },
];
