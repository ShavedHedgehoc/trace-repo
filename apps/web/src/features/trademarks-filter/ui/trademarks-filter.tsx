import { useTrademarksSearchParams } from '@/entities/trademark';
import { cn, useIsMobile } from '@/shared/lib';
import {
  Button,
  FilterInput,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';
import { FilterResetButton } from '@/shared/ui/filter-reset-button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { throttle } from 'nuqs';
import React from 'react';

export function TrademarksFilter() {
  const isMobile = useIsMobile();
  const { params, setParams } = useTrademarksSearchParams();
  const [open, setOpen] = React.useState(false);

  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isMounted) return <div className="h-10" />;

  const isDirty = !!params.productCode || !!params.productName || !!params.trademarkName;

  const filterFields = (
    <>
      <FilterInput
        id={'trademarkName'}
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        placeholder="Поиск по торговому названию"
        value={params.trademarkName ?? ''}
        onChange={(val) =>
          setParams(
            { trademarkName: val || null, page: 1 },
            { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
          )
        }
      />
      <FilterInput
        id={'productCode'}
        value={params.productCode ?? ''}
        placeholder="Поиск по коду"
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        onChange={(val) => {
          setParams(
            {
              productCode: val || null,
              page: 1,
            },
            { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
          );
        }}
      />
      <FilterInput
        id={'productName'}
        value={params.productName ?? ''}
        placeholder="Поиск по наименованию"
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
            <SheetDescription className="sr-only">trademark filter</SheetDescription>
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
