import type { ColumnDef } from '@tanstack/react-table';
import type { TLotDetailBoilRow } from '@repo/schemas';
import { baseBoilsLotsListColumns } from '@/entities/lot';
import { RowDropdown } from '@/features/boils-list-actions';

export const getLotBoilsColumns = (): ColumnDef<TLotDetailBoilRow>[] => {
  return [
    ...baseBoilsLotsListColumns,
    {
      id: 'actions',

      cell: ({ row }) => {
        return (
          <div className="text-center">
            <RowDropdown boilId={row.original.boilId} isInactive={!row.original.hasPlan} />
          </div>
        );
      },
    },
  ];
};
