import { trpc } from '@/shared/api';
import {
  TablePagination,
  TableLayout,
  type ITablePaginationProps,
  type TDataTableProps,
} from '@/shared/ui';
import { useMemo } from 'react';
import { getCellsContainColumns } from './columns';
import type { TCellsContainListRow } from '@repo/schemas';
import { useIsMobile } from '@/shared/lib';
import { useCellsContainSearchParams, type CellsContainParams } from '@/entities/cell';
import { CellsContainFilter } from '@/features/cells-contain-filter.tsx';

export function CellsContainView() {
  const isMobile = useIsMobile();
  const { params, setParams } = useCellsContainSearchParams();
  const { data, isFetching, isPlaceholderData } = trpc.cell.list.useQuery(params, {
    keepPreviousData: true,
  });

  const columns = useMemo(() => {
    const base = getCellsContainColumns();
    return isMobile ? base.filter((col) => !col.meta?.hideOnMobile) : base;
  }, [isMobile]);

  const tableLayoutProps: TDataTableProps<TCellsContainListRow, CellsContainParams> = {
    data: data?.rows,
    columns: columns,
    params: params,
    isFetching: isFetching || isPlaceholderData,
  };

  const paginationProps: ITablePaginationProps<CellsContainParams> = {
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    params: params,
    setParams: setParams,
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
      <CellsContainFilter />
      <TableLayout {...tableLayoutProps} />
      <TablePagination {...paginationProps} />
    </div>
  );
}
