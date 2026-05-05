import type { ColumnDef } from '@tanstack/react-table';
import type { TBoilListRow } from '@repo/schemas';
import { baseBoilsListColumns } from '@/entities/boil';

export const getBoilsColumns = (): ColumnDef<TBoilListRow>[] => {
    return [
        ...baseBoilsListColumns,
        // {
        //     id: "picture_actions",
        //     cell: ({ row }) => <ActionsCell operation={row.original} />,
        // },
        // {
        //     id: "actions",
        //     cell: ({ row }) => {
        //         return (
        //             <div className="text-center">
        //                 <RowDropdown
        //                     id={row.original.id}
        //                     isInactive={row.original.isInactive}
        //                 />
        //             </div>
        //         );
        //     },
        // },
    ];
};
