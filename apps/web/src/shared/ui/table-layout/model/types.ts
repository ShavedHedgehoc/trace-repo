import type { ColumnDef } from '@tanstack/react-table';
export type PaginationParams = {
  page: number;
  limit: number;
  [key: string]: unknown;
};

export type TDataTableProps<TData, T extends PaginationParams> = {
  data: TData[] | undefined;
  columns: ColumnDef<TData>[];
  params: T | undefined;
  className?: string;
  isFetching?: boolean;
  getRowClassName?: (row: TData) => string;
};
