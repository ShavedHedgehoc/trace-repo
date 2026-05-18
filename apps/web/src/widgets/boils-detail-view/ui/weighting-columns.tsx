import type { ColumnDef } from '@tanstack/react-table';
import type { TBoilDetailWeightingRow } from '@repo/schemas';
import { baseBoilWeightingColumns } from '@/entities/boil';
import { RowDropdown } from '@/features/weighting-list-actions';

export const getBoilWeightingsColumns = (): ColumnDef<TBoilDetailWeightingRow>[] => {
  return [
    ...baseBoilWeightingColumns,
    {
      id: 'actions',

      cell: ({ row }) => {
        return (
          <div className="text-center">
            <RowDropdown
              lotId={row.original.lotId}
              // isInactive={row.original.isInactive}
            />
          </div>
        );
      },
    },
  ];
};
