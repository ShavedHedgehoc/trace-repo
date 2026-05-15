import type { TUsersListRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { UserRolesCell } from './user-roles-cell';
import { UserNameCell } from './user-name-cell';

export const baseUserListColumns: ColumnDef<TUsersListRow>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="text-left pl-3">Пользователь</div>,
    cell: ({ row }) => <UserNameCell user={row.original} />,
  },
  {
    accessorKey: 'email',
    header: () => <span className="hidden sm:block text-left">Электропочта</span>,
    cell: ({ row }) => (
      <span className="hidden sm:block text-muted-foreground">{row.original.userEmail}</span>
    ),
  },
  {
    header: () => <div className="text-center">Роли</div>,
    id: 'roles',
    cell: ({ row: { original: user } }) => <UserRolesCell roles={user.roles} />,
  },
];
