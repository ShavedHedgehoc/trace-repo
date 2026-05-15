import { trpc } from '@/shared/api';
import {
  TablePagination,
  TableLayout,
  type ITablePaginationProps,
  type TDataTableProps,
} from '@/shared/ui';
import { useMemo } from 'react';
import { useIsMobile } from '@/shared/lib';
import { getUserColumns } from './columns';
import type { TUsersListRow } from '@repo/schemas';
import { useUserSearchParams, type UserParams } from '@/entities/user';
import { UsersFilter } from '@/features/users-filter';

export function UsersView() {
  const isMobile = useIsMobile();
  const { params, setParams } = useUserSearchParams();
  const { data, isFetching, isPlaceholderData } = trpc.user.list.useQuery(params, {
    keepPreviousData: true,
  });
  const { data: rolesData } = trpc.role.list.useQuery();

  const columns = useMemo(() => {
    const base = getUserColumns({ roles: rolesData?.rows ?? [] });
    return isMobile ? base.filter((col) => !col.meta?.hideOnMobile) : base;
  }, [isMobile, rolesData]);

  const tableLayoutProps: TDataTableProps<TUsersListRow, UserParams> = {
    data: data?.rows,
    columns: columns,
    params: params,
    isFetching: isFetching || isPlaceholderData,
  };

  const paginationProps: ITablePaginationProps<UserParams> = {
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    params: params,
    setParams: setParams,
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
      <UsersFilter roles={rolesData?.rows ?? []} />
      <TableLayout {...tableLayoutProps} />
      <TablePagination {...paginationProps} />
    </div>
  );
}
