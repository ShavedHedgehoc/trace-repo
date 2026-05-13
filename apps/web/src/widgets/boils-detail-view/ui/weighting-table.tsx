import { baseBoilWeightingColumns } from '@/entities/boil';
import { useIsMobile } from '@/shared/lib';
import { TableLayout, type TDataTableProps } from '@/shared/ui';
import type { TBoilDetailWeightingRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

interface IWeightingTableProps {
  data: TBoilDetailWeightingRow[];
  isFetching: boolean;
  isPlaceholderData: boolean;
}
export function WeightingTable({ data, isFetching, isPlaceholderData }: IWeightingTableProps) {
  const isMobile = useIsMobile();
  const getBoilsColumns = (): ColumnDef<TBoilDetailWeightingRow>[] => {
    return [...baseBoilWeightingColumns];
  };

  const columns = useMemo(() => {
    const base = getBoilsColumns();
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
