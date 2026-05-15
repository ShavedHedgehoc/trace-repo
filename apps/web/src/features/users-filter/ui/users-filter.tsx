import { useUserSearchParams } from '@/entities/user';
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
import RolesCombobox from './roles-combobox';
import type { TRolesListRow } from '@repo/schemas';

export function UsersFilter({ roles }: { roles: TRolesListRow[] }) {
  const isMobile = useIsMobile();
  const { params, setParams } = useUserSearchParams();
  const [open, setOpen] = React.useState(false);

  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isMounted) return <div className="h-10" />;

  const isDirty = !!params.name || !!params.email || (params.roles && params.roles.length > 0);

  const filterFields = (
    <>
      <FilterInput
        id={'nameInput'}
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        placeholder="Поиск по ФИО"
        value={params.name ?? ''}
        onChange={(val) =>
          setParams(
            { name: val || null, page: 1 },
            { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
          )
        }
      />
      <FilterInput
        id={'emailInput'}
        value={params.email ?? ''}
        placeholder="Поиск по email"
        className={cn(isMobile ? 'w-full' : 'w-[200px]')}
        onChange={(val) => {
          setParams(
            {
              email: val || null,
              page: 1,
            },
            { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
          );
        }}
      />
      <RolesCombobox items={roles} />
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
            <SheetDescription className="sr-only">user filter</SheetDescription>
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
