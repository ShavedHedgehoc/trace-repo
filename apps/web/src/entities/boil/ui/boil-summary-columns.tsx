import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import type { TBoilListWeightingResult } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, TriangleAlert } from 'lucide-react';

export const baseBoilSummaryColumns: ColumnDef<TBoilListWeightingResult>[] = [
  {
    accessorKey: 'productId',
    enableResizing: true,
    header: () => <div className="text-center">Код 1С</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.productId}</div>;
    },
  },
  {
    accessorKey: 'productName',
    header: () => <div className="text-center">Наименование</div>,
    cell: ({ row }) => {
      return (
        <div className="text-left">
          {(row.original.productMarking || row.original.productName) ?? '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'state',
    header: () => <div className="text-center"></div>,
    cell: ({ row }) => {
      const isWeightingProblem = row.original.planQty !== row.original.factQty;
      const isLoadProblem = row.original.planQty !== row.original.loadQty;
      return (
        <div className="text-center">
          <Button variant="ghost" className={cn('h-8 w-8 p-0')}>
            {isLoadProblem || isWeightingProblem ? (
              <TriangleAlert className="text-red-700 dark:text-red-500" />
            ) : (
              <CheckCircle2 />
            )}
          </Button>
        </div>
      );
    },
  },

  {
    accessorKey: 'plan',
    header: () => <div className="text-center">План</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.planQty ?? 0}</div>;
    },
  },

  {
    accessorKey: 'weightings',
    header: () => <div className="text-center">Взвешивания</div>,
    cell: ({ row }) => {
      const isWeightingProblem = row.original.planQty !== row.original.factQty;
      return (
        <div
          className={cn(
            'text-center',
            isWeightingProblem && 'font-black text-red-700 dark:text-red-500',
          )}
        >
          {/* {isWeightingProblem ? <AlertCircle /> : <CheckIcon className='h-4' />} */}
          {row.original.factQty ?? 0}
        </div>
      );
    },
  },
  {
    accessorKey: 'loads',
    header: () => <div className="text-center">Загрузки</div>,
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            'text-center',
            row.original.planQty !== row.original.loadQty &&
              'font-black  text-red-700 dark:text-red-500',
          )}
        >
          {row.original.loadQty ?? 0}
        </div>
      );
    },
  },
];
