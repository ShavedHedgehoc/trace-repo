import { useLotDetailSearchParams, type LotDetailsParams } from '@/entities/lot';
import { PLANT_LIST_ITEMS } from '@/shared/constants';
import { cn, getMonthBounds, useIsMobile } from '@/shared/lib';
import {
  Button,
  FilterResetButton,
  FilterDatePicker,
  FilterInput,
  FilterSelector,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';
import { SlidersHorizontal, Search } from 'lucide-react';
import { throttle } from 'nuqs';
import React from 'react';

type Props = {
  actions?: React.ReactNode;
};

export function LotDetailFilter({ actions }: Props) {
  const isMobile = useIsMobile();
  const { params, setParams } = useLotDetailSearchParams();
  const [open, setOpen] = React.useState(false);

  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isMounted) return <div className="h-10" />;

  const isDirty =
    params.startDate.getTime() !== getMonthBounds().start.getTime() ||
    params.endDate.getTime() !== getMonthBounds().end.getTime() ||
    !!params.productId ||
    !!params.productMarking ||
    !!params.batchName ||
    (params.plants && params.plants.length > 0);

  const handleDateChange = (type: 'start' | 'end', val: Date | undefined) => {
    if (!val) {
      setParams(
        { [type === 'start' ? 'startDate' : 'endDate']: null, page: 1 },
        { shallow: false },
      );
      return;
    }

    const normalizedDate = new Date(val);
    normalizedDate.setHours(12, 0, 0, 0);
    const updates: Partial<LotDetailsParams> = { page: 1 };

    if (type === 'start') {
      updates.startDate = normalizedDate;
      if (params.endDate && normalizedDate > params.endDate) {
        updates.endDate = normalizedDate;
      }
    } else {
      updates.endDate = normalizedDate;
      if (params.startDate && normalizedDate < params.startDate) {
        updates.startDate = normalizedDate;
      }
    }
    setParams(updates, { shallow: false });
  };

  const filterFields = (
    <>
      <FilterInput
        id={'batch'}
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        placeholder="Поиск по партии"
        value={params.batchName ?? ''}
        onChange={(val) =>
          setParams(
            { batchName: val || null, page: 1 },
            { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
          )
        }
      />
      <div className="grid grid-cols-2 gap-2">
        <FilterDatePicker
          className={cn(isMobile && 'w-full')}
          value={params.startDate}
          onChange={(val) => handleDateChange('start', val)}
        />
        <FilterDatePicker
          className={cn(isMobile && 'w-full')}
          value={params.endDate}
          onChange={(val) => handleDateChange('end', val)}
        />
      </div>
      <FilterSelector
        id={'plants'}
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        items={PLANT_LIST_ITEMS}
        value={params.plants ?? []}
        onChange={(val) => {
          setParams(
            {
              plants: val || null,
              page: 1,
            },
            { shallow: false },
          );
        }}
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
        id={'productMarkingInput'}
        value={params.productMarking ?? ''}
        placeholder="Поиск по артикулу"
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        onChange={(val) => {
          setParams(
            {
              productMarking: val || null,
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
            <SheetDescription className="sr-only">boils filter</SheetDescription>
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
              {actions}
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
    <div className="flex gap-2 justify-between">
      <div className="flex gap-2">
        {filterFields}
        <FilterResetButton
          id={'reset'}
          mobile={isMobile}
          onClick={() => setParams(null)}
          isDirty={isDirty}
        />
      </div>
      <div className="flex">{actions}</div>
    </div>
  );
}
