import { baseMaterialListColumns } from '@/entities/material';
import type { TMaterialsListRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';

export const getMaterialColumns = (): ColumnDef<TMaterialsListRow>[] => {
  return [
    ...baseMaterialListColumns,
    // {
    //     id: 'actions',
    //     cell: ({ row }) => {
    //         return (
    //             <div className="text-center">
    //                 <RowDropdown
    //                     cellsContainId={row.original.recordId}
    //                 />
    //             </div>
    //         );
    //     },
    // },
  ];
};
