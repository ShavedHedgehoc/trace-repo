import type { ColumnDef } from "@tanstack/react-table";
export type PaginationParams = {
    page: number;
    limit: number;
    [key: string]: unknown;
};

export type DataViewLayoutProps<TData, T extends PaginationParams> = {
    title: string;
    description: string;
    data: TData[] | undefined;
    columns: ColumnDef<TData>[];
    total: number;
    totalPages: number;
    picture: React.ReactNode;
    filter: React.ReactNode;
    params: T;
    setParams: (
        state: Partial<T> | ((prev: T) => Partial<T> | null) | null,
    ) => Promise<URLSearchParams>;
    className?: string;
    isFetching?: boolean;
    getRowClassName?: (row: TData) => string;
};