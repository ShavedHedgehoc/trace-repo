import { baseBoilTechCardColumns } from '@/entities/boil';
import { useIsMobile } from '@/shared/lib';
import { TableLayout, type TDataTableProps } from '@/shared/ui';
import type { TBoilDetailTechCardRow } from '@repo/schemas';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

interface ITechCardTableProps {
  data: TBoilDetailTechCardRow[];
  isFetching: boolean;
  isPlaceholderData: boolean;
}
export function TechCardTable({ data, isFetching, isPlaceholderData }: ITechCardTableProps) {
  const isMobile = useIsMobile();
  const getBoilsColumns = (): ColumnDef<TBoilDetailTechCardRow>[] => {
    return [...baseBoilTechCardColumns];
  };

  const columns = useMemo(() => {
    const base = getBoilsColumns();
    return isMobile ? base.filter((col) => !col.meta?.hideOnMobile) : base;
  }, [isMobile]);

  const tableLayoutProps: TDataTableProps<TBoilDetailTechCardRow, undefined> = {
    data: data,
    columns: columns,
    params: undefined,
    isFetching: isFetching || isPlaceholderData,
  };

  return <TableLayout {...tableLayoutProps} />;
}
