import { trpc } from '@/shared/api';
import {
  TablePagination,
  TableLayout,
  type ITablePaginationProps,
  type TDataTableProps,
} from '@/shared/ui';
import { useMemo } from 'react';
import { useIsMobile } from '@/shared/lib';
import { useMaterialSearchParams, type MaterialParams } from '@/entities/material';
import { getMaterialColumns } from './columns';
import type { TMaterialsListRow } from '@repo/schemas';

export function MaterialView() {
  const isMobile = useIsMobile();
  const { params, setParams } = useMaterialSearchParams();
  const { data, isFetching, isPlaceholderData } = trpc.material.list.useQuery(params, {
    keepPreviousData: true,
  });

  const columns = useMemo(() => {
    const base = getMaterialColumns();
    return isMobile ? base.filter((col) => !col.meta?.hideOnMobile) : base;
  }, [isMobile]);

  const tableLayoutProps: TDataTableProps<TMaterialsListRow, MaterialParams> = {
    data: data?.rows,
    columns: columns,
    params: params,
    isFetching: isFetching || isPlaceholderData,
  };

  const paginationProps: ITablePaginationProps<MaterialParams> = {
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    params: params,
    setParams: setParams,
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
      {/* <CellsContainFilter /> */}
      <TableLayout {...tableLayoutProps} />
      <TablePagination {...paginationProps} />
    </div>
  );
}
