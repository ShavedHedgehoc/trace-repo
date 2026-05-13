import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import type { TPaginationParams } from '../model';

export interface ITablePaginationProps<T extends TPaginationParams> {
  total: number;
  totalPages: number;
  params: T;
  setParams: (
    state: Partial<T> | ((prev: T) => Partial<T> | null) | null,
  ) => Promise<URLSearchParams>;
}

export function TablePagination<T extends TPaginationParams>({
  total,
  totalPages,
  params,
  setParams,
}: ITablePaginationProps<T>) {
  const handlePageChange = (page: number) => {
    setParams({ page } as Partial<T>);
  };

  const handleLimitChange = (limit: string) => {
    const nextLimit = Number(limit);
    const nextTotalPages = Math.ceil(total / nextLimit);
    const nextPage = params.page > nextTotalPages ? 1 : params.page;

    setParams({
      limit: nextLimit,
      page: nextPage,
    } as Partial<T>);
  };

  const isFirstPage = params.page <= 1;
  const isLastPage = params.page >= totalPages;

  return (
    <div className="flex items-center justify-between px-4">
      <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
        Всего записей: {total}
      </div>
      <div className="flex w-full items-center gap-8 lg:w-fit">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            На странице:
          </Label>
          <Select value={params.limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={params.limit.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                {[10, 20, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Страница: {params.page} из {totalPages}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => {
              if (!isFirstPage) handlePageChange(1);
            }}
            disabled={isFirstPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => {
              if (!isFirstPage) handlePageChange(params.page - 1);
            }}
            disabled={isFirstPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => {
              if (!isLastPage) handlePageChange(params.page + 1);
            }}
            disabled={isLastPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => {
              if (!isLastPage) handlePageChange(totalPages);
            }}
            disabled={isLastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
