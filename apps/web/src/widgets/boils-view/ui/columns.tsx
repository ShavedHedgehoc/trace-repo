import type { ColumnDef } from '@tanstack/react-table';
import type { TBoilListRow } from '@repo/schemas';
import { baseBoilsListColumns } from '@/entities/boil';
import { RowDropdown } from '@/features/boils-list-actions';

export const getBoilsColumns = (): ColumnDef<TBoilListRow>[] => {
  return [
    ...baseBoilsListColumns,
    {
      id: 'actions',

      cell: ({ row }) => {
        return (
          <div className="text-center">
            <RowDropdown boilId={row.original.boilId} />
          </div>
        );
      },
    },
  ];
};
