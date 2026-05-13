import { baseBoilSummaryColumns } from '@/entities/boil';
import { useIsMobile } from '@/shared/lib';
import { TableLayout, type TDataTableProps } from '@/shared/ui';
import type { TBoilListWeightingResult } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

interface ISummaryTableProps {
  data: TBoilListWeightingResult[];
  isFetching: boolean;
  isPlaceholderData: boolean;
}
export function SummaryTable({ data, isFetching, isPlaceholderData }: ISummaryTableProps) {
  const isMobile = useIsMobile();
  const getBoilsColumns = (): ColumnDef<TBoilListWeightingResult>[] => {
    return [...baseBoilSummaryColumns];
  };

  const columns = useMemo(() => {
    const base = getBoilsColumns();
    return isMobile ? base.filter((col) => !col.meta?.hideOnMobile) : base;
  }, [isMobile]);

  const tableLayoutProps: TDataTableProps<TBoilListWeightingResult, undefined> = {
    data: data,
    columns: columns,
    params: undefined,
    isFetching: isFetching || isPlaceholderData,
  };

  return <TableLayout {...tableLayoutProps} />;
}
