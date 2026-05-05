import type { ColumnDef } from '@tanstack/react-table';
import type { TTrademarkListRow } from '@repo/trpc';
import { baseTrademarkColumns } from '@/entities/trademark';

export const getTrademarksColumns = (): ColumnDef<TTrademarkListRow>[] => {
  return [
    ...baseTrademarkColumns,
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
