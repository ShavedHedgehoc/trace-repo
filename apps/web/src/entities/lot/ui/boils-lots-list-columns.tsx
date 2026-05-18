import { mapPlants } from '@/shared/lib';
import type { TLotDetailBoilRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Informer } from './informer';

export const baseBoilsLotsListColumns: ColumnDef<TLotDetailBoilRow>[] = [
  {
    accessorKey: 'boilName',
    enableResizing: true,
    header: () => <div className="text-center">Варка</div>,
    cell: ({ row }) => {
      const showInformer = !row.original.hasPlan;

      return (
        <div className="flex items-left justify-center w-full">
          <div className="grid grid-cols-[24px_auto_24px] items-center text-center font-medium">
            <div className="flex justify-start">{showInformer && <Informer />}</div>
            <span className="px-4 whitespace-nowrap">{row.original.batchName}</span>
            <div className="w-6" aria-hidden="true" />
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: 'boilDate',
    header: () => <div className="text-center">Дата</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center tabular-nums">
          {row.original.boilDate ? format(row.original.boilDate, 'dd-MM-yyyy') : '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'plant',
    header: () => <div className="text-center">Площадка</div>,
    cell: ({ row }) => {
      return <div className="text-center">{mapPlants(row.original.plantAbb) ?? '-'}</div>;
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
    accessorKey: 'productMarking',
    header: () => <div className="text-center">Артикул</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.productMarking ?? '-'}</div>;
    },
  },
];
