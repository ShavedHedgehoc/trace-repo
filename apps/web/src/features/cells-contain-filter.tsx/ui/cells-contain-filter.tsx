import { useCellsContainSearchParams } from '@/entities/cell';
import { cn, useIsMobile } from '@/shared/lib';
import {
  Button,
  FilterInput,
  FilterSelector,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';
import type { IListItem } from '@/shared/ui';
import { FilterResetButton } from '@/shared/ui/filter-reset-button';
import type { SortableColumns } from '@repo/schemas';
import { Search, SlidersHorizontal } from 'lucide-react';
import { throttle } from 'nuqs';
import React from 'react';

type SortableColumnType = (typeof SortableColumns)[number];
interface ISortableListItem extends Omit<IListItem, 'value'> {
  value: SortableColumnType;
}
const sortListItems: ISortableListItem[] = [
  { value: 'All', description: 'По ячейкам' },
  { value: 'productId', description: 'По коду' },
  { value: 'productName', description: 'По продукту' },
  { value: 'expDate', description: 'По сроку годности' },
];

export function CellsContainFilter() {
  const isMobile = useIsMobile();
  const { params, setParams } = useCellsContainSearchParams();
  const [open, setOpen] = React.useState(false);

  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isMounted) return <div className="h-10" />;

  const isDirty =
    !!params.productId ||
    !!params.productName ||
    !!params.cellName ||
    (params.order && params.order.length > 0);

  const filterFields = (
    <>
      <FilterInput
        id={'cellNameInput'}
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        placeholder="Поиск по ячейке"
        value={params.cellName ?? ''}
        onChange={(val) =>
          setParams(
            { cellName: val || null, page: 1 },
            { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
          )
        }
      />
      <FilterInput
        id={'productIdInput'}
        value={params.productId ?? ''}
        placeholder="Поиск по коду"
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        onChange={(val) => {
          setParams(
            {
              productId: val || null,
              page: 1,
            },
            { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
          );
        }}
      />
      <FilterInput
        id={'productNameInput'}
        value={params.productName ?? ''}
        placeholder="Поиск по артикулу"
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        onChange={(val) => {
          setParams(
            {
              productName: val || null,
              page: 1,
            },
            { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
          );
        }}
      />

      <FilterSelector
        id={'plants'}
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        items={sortListItems}
        value={params.order ?? []}
        onChange={(val) => {
          setParams(
            {
              order: val || null,
              page: 1,
            },
            { shallow: false },
          );
        }}
      />
    </>
  );
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Фильтры {isDirty && <span className="ml-2 rounded-full bg-primary w-2 h-2" />}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto ">
          <SheetHeader>
            <SheetTitle>Фильтры</SheetTitle>
            <SheetDescription className="sr-only">cell filter</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 py-4 px-2">
            {filterFields}
            <div className="flex flex-col gap-2 mt-4">
              <FilterResetButton
                mobile={isMobile}
                isDirty={isDirty}
                onClick={() => setParams(null)}
                className="w-full h-9"
              />
              <Button className="w-full h-9 text-xs" onClick={() => setOpen(false)}>
                <Search /> Показать
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <div className="flex gap-2">
      {filterFields}
      <FilterResetButton
        id={'reset'}
        mobile={isMobile}
        onClick={() => setParams(null)}
        isDirty={isDirty}
      />
    </div>
  );
}
