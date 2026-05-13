import { trpc } from '@/shared/api';
import {
  TableLayout,
  TablePagination,
  type ITablePaginationProps,
  type TDataTableProps,
} from '@/shared/ui';
import { useMemo } from 'react';
import { getTrademarksColumns } from './columns';
import { useTrademarksSearchParams } from '@/entities/trademark';
import type { TrademarksParams } from '@/entities/trademark/model';
import type { TTrademarkListRow } from '@repo/schemas';
import { useIsMobile } from '@/shared/lib';
import { TrademarksFilter } from '@/features/trademarks-filter';

export function TrademarksView() {
  const isMobile = useIsMobile();
  const { params, setParams } = useTrademarksSearchParams();
  const { data, isFetching, isPlaceholderData } = trpc.trademark.list.useQuery(params, {
    keepPreviousData: true,
  });

  const columns = useMemo(() => {
    const base = getTrademarksColumns();
    return isMobile ? base.filter((col) => !col.meta?.hideOnMobile) : base;
  }, [isMobile]);

  const tableLayoutProps: TDataTableProps<TTrademarkListRow, TrademarksParams> = {
    data: data?.rows,
    columns: columns,
    params: params,
    isFetching: isFetching || isPlaceholderData,
  };

  const paginationProps: ITablePaginationProps<TrademarksParams> = {
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    params: params,
    setParams: setParams,
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
      {/* <SectionCards /> */}
      <TrademarksFilter />
      <TableLayout {...tableLayoutProps} />
      <TablePagination {...paginationProps} />
    </div>
  );
}
