import { trpc } from '@/shared/api';
import { ROUTE_PARAMS } from '@/shared/constants';
import { useIsMobile } from '@/shared/lib';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getLotBoilsColumns } from './columns';
import {
  TableLayout,
  TablePagination,
  type ITablePaginationProps,
  type TDataTableProps,
} from '@/shared/ui';
import type { TLotDetailBoilRow } from '@repo/schemas';
import { useLotDetailSearchParams, type LotDetailsParams } from '@/entities/lot';
// import { LotDetailHeader } from './header';

export function LotDetailView() {
  const isMobile = useIsMobile();
  const routeParams = useParams<typeof ROUTE_PARAMS.LOT_PARAMS>();
  const { params, setParams } = useLotDetailSearchParams();
  const lotId: string | undefined = routeParams.lotId;
  const { data, isFetching, isPlaceholderData } = trpc.lot.getDetail.useQuery(
    {
      lotId: Number(lotId),
      ...params,
    },
    {
      keepPreviousData: true,
      enabled: !!lotId,
    },
  );

  const columns = useMemo(() => {
    const base = getLotBoilsColumns();
    return isMobile ? base.filter((col) => !col.meta?.hideOnMobile) : base;
  }, [isMobile]);

  const tableLayoutProps: TDataTableProps<TLotDetailBoilRow, LotDetailsParams> = {
    data: data?.rows,
    columns: columns,
    params: params,
    isFetching: isFetching || isPlaceholderData,
  };

  const paginationProps: ITablePaginationProps<LotDetailsParams> = {
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    params: params,
    setParams: setParams,
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
      {/* <LotDetailHeader data={data?.data} /> */}
      <TableLayout {...tableLayoutProps} />
      <TablePagination {...paginationProps} />
    </div>
  );
}
