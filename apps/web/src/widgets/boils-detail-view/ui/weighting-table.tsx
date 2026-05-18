import { useIsMobile } from '@/shared/lib';
import { TableLayout, type TDataTableProps } from '@/shared/ui';
import type { TBoilDetailWeightingRow } from '@repo/schemas';
import { useMemo } from 'react';
import { getBoilWeightingsColumns } from './weighting-columns';

interface IWeightingTableProps {
  data: TBoilDetailWeightingRow[];
  isFetching: boolean;
  isPlaceholderData: boolean;
}
export function WeightingTable({ data, isFetching, isPlaceholderData }: IWeightingTableProps) {
  const isMobile = useIsMobile();
  const columns = useMemo(() => {
    const base = getBoilWeightingsColumns();
    return isMobile ? base.filter((col) => !col.meta?.hideOnMobile) : base;
  }, [isMobile]);

  const tableLayoutProps: TDataTableProps<TBoilDetailWeightingRow, undefined> = {
    data: data,
    columns: columns,
    params: undefined,
    isFetching: isFetching || isPlaceholderData,
  };

  return <TableLayout {...tableLayoutProps} />;
}
