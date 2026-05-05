import {
  Field,
  FieldLabel,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

import { cn } from '@/shared/lib';
import type { PaginationParams } from '../model';

interface TablePaginationProps<T extends PaginationParams> {
  totalPages: number;
  total: number;
  params: T;
  setParams: (
    state: Partial<T> | ((prev: T) => Partial<T> | null) | null,
  ) => Promise<URLSearchParams>;
}

export function TablePagination<T extends PaginationParams>({
  totalPages,
  total,
  params,
  setParams,
}: TablePaginationProps<T>) {
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
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">На странице</FieldLabel>
        <Select value={params.limit.toString()} onValueChange={handleLimitChange}>
          <SelectTrigger className="w-20 bg-background shadow-none" id="select-rows-per-page">
            <SelectValue>{params.limit.toString()}</SelectValue>
          </SelectTrigger>
          <SelectContent align="start" className="bg-background shadow-none">
            <SelectGroup>
              {['10', '25', '50', '100'].map((v) => (
                <SelectItem key={v} value={v}>
                  {v}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!isFirstPage) handlePageChange(params.page - 1);
              }}
              className={cn(isFirstPage && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>
          <p className="text-muted-foreground text-sm italic select-none">
            {`Страница ${params.page} из ${totalPages}`}
          </p>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!isLastPage) handlePageChange(params.page + 1);
              }}
              className={cn(isLastPage && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
