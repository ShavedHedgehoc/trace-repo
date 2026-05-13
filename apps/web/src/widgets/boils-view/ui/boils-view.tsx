import { trpc } from '@/shared/api';
import {
  TablePagination,
  TableLayout,
  type ITablePaginationProps,
  type TDataTableProps,
} from '@/shared/ui';
import { useMemo } from 'react';
import { getBoilsColumns } from './columns';
import type { TBoilListRow } from '@repo/schemas';
import { useBoilsSearchParams, type BoilsParams } from '@/entities/boil';
import { BoilsSectionCards } from './cards';
import { BoilsFilter } from '@/features/boils-filter';
import { useIsMobile } from '@/shared/lib';

export function BoilsView() {
  const isMobile = useIsMobile();
  const { params, setParams } = useBoilsSearchParams();
  const { data, isFetching, isPlaceholderData } = trpc.boil.list.useQuery(params, {
    keepPreviousData: true,
  });

  const columns = useMemo(() => {
    const base = getBoilsColumns();
    return isMobile ? base.filter((col) => !col.meta?.hideOnMobile) : base;
  }, [isMobile]);

  const tableLayoutProps: TDataTableProps<TBoilListRow, BoilsParams> = {
    data: data?.rows,
    columns: columns,
    params: params,
    isFetching: isFetching || isPlaceholderData,
  };

  const paginationProps: ITablePaginationProps<BoilsParams> = {
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    params: params,
    setParams: setParams,
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
      <BoilsSectionCards startDate={params.startDate} endDate={params.endDate} />
      <BoilsFilter />
      <TableLayout {...tableLayoutProps} />
      <TablePagination {...paginationProps} />
    </div>
  );
}
