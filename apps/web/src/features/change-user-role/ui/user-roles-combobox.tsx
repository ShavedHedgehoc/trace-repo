import { cn } from '@/shared/lib';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui';
import { Check, ChevronDown } from 'lucide-react';
import { useCombobox } from '../model';
import { useState } from 'react';
import type { TRolesListRow, TUsersListRow } from '@repo/schemas';

export function UserRolesCombobox({
  user,
  roles,
}: {
  user: TUsersListRow;
  roles: TRolesListRow[];
}) {
  const [open, setOpen] = useState(false);
  const { selectedIds, isChanged, reset, onUpdate, onSelect } = useCombobox({
    user,
  });

  const handleUpdate = async () => {
    await onUpdate();
    setOpen(false);
  };
  if (roles.length === 0) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="py-0 px-3 text-xs">
          Роли
          <ChevronDown className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command className="bg-background shadow-none">
          <CommandList>
            <CommandEmpty>Ничего не найдено.</CommandEmpty>
            <CommandGroup>
              {roles.map((item) => {
                const isSelected = selectedIds.includes(item.roleId.toString());
                return (
                  <CommandItem
                    key={item.roleId}
                    onSelect={() => onSelect(item.roleId.toString())}
                    className="flex items-center"
                    disabled={item.roleName === 'User'}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected ? 'bg-primary/30 text-primary' : 'opacity-50',
                      )}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </div>
                    <span className="flex-1">{item.roleAlias}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedIds.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={reset}
                    className="justify-center text-center text-sm font-medium cursor-pointer"
                  >
                    Вернуть
                  </CommandItem>
                  {isChanged && (
                    <CommandItem
                      onSelect={handleUpdate}
                      className={cn(
                        'justify-center text-sm font-bold cursor-pointer text-destructive',
                      )}
                    >
                      Сохранить
                    </CommandItem>
                  )}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
