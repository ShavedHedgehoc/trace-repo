import { baseBoilLoadColumns } from '@/entities/boil';
import { useIsMobile } from '@/shared/lib';
import { TableLayout, type TDataTableProps } from '@/shared/ui';
import type { TBoilDetailLoadRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

interface ILoadTableProps {
  data: TBoilDetailLoadRow[];
  isFetching: boolean;
  isPlaceholderData: boolean;
}
export function LoadTable({ data, isFetching, isPlaceholderData }: ILoadTableProps) {
  const isMobile = useIsMobile();
  const getBoilsColumns = (): ColumnDef<TBoilDetailLoadRow>[] => {
    return [...baseBoilLoadColumns];
  };

  const columns = useMemo(() => {
    const base = getBoilsColumns();
    return isMobile ? base.filter((col) => !col.meta?.hideOnMobile) : base;
  }, [isMobile]);

  const tableLayoutProps: TDataTableProps<TBoilDetailLoadRow, undefined> = {
    data: data,
    columns: columns,
    params: undefined,
    isFetching: isFetching || isPlaceholderData,
  };

  return <TableLayout {...tableLayoutProps} />;
}
