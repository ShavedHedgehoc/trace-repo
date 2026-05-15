import type { TUpdateUserRolesInput, TUsersListRow } from '@repo/schemas';
import { useUpdateUserRoles } from './use-update-user-roles';
import { useState } from 'react';

export function useCombobox({ user }: { user: TUsersListRow }) {
  const { updateUserRoles } = useUpdateUserRoles();

  const [selectedIds, setSelectedIds] = useState<string[]>(
    user.roles?.map((r) => r.RolePK.toString()) || [],
  );

  const onSelect = (id: string) => {
    const nextIds = selectedIds.includes(id)
      ? selectedIds.filter((itemId) => itemId !== id)
      : [...selectedIds, id];
    setSelectedIds(nextIds);
  };

  const reset = () => setSelectedIds(user.roles?.map((r) => r.RolePK.toString()) || []);

  const onUpdate = () => {
    const data: TUpdateUserRolesInput = {
      userId: user.userId,
      roles: selectedIds.map((i) => Number(i)),
    };
    updateUserRoles(data);
  };

  const isChanged =
    JSON.stringify([...selectedIds].sort()) !==
    JSON.stringify(user.roles?.map((r) => r.RolePK.toString()).sort());

  return {
    updateUserRoles,
    selectedIds,
    setSelectedIds,
    reset,
    onUpdate,
    onSelect,
    isChanged,
  };
}
