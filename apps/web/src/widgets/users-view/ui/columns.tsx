import { baseUserListColumns } from '@/entities/user';
import { UserRolesCombobox } from '@/features/change-user-role';
import { RowDropdown } from '@/features/users-list-action';
import type { TRolesListRow, TUsersListRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';

export const getUserColumns = ({
  roles,
}: {
  roles: TRolesListRow[];
}): ColumnDef<TUsersListRow>[] => {
  return [
    ...baseUserListColumns,
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-2 items-center justify-center">
            <UserRolesCombobox user={row.original} roles={roles} />
            <RowDropdown id={row.original.userId} />
          </div>
        );
      },
    },
  ];
};
