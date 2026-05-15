import type { ColumnDef } from '@tanstack/react-table';
import type { TCellsContainListRow } from '@repo/schemas';

import { baseCellsListColumns } from '@/entities/cell';
import { RowDropdown } from '@/features/cells-contain-actions';

export const getCellsContainColumns = (): ColumnDef<TCellsContainListRow>[] => {
  return [
    ...baseCellsListColumns,
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="text-center">
            <RowDropdown cellsContainId={row.original.recordId} />
          </div>
        );
      },
    },
  ];
};
