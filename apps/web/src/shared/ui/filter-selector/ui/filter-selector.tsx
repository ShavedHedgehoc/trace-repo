import { cn } from '@/shared/lib';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useMemo } from 'react';

export interface IListItem<T extends string = string> {
  value: T;
  description: string;
}

export interface IFilterSelectorProps<T extends string = string> extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange'
> {
  value: T[] | undefined;
  onChange: (val: T[] | undefined | null) => void;
  className?: string;
  items: readonly IListItem<T>[];
}

export function FilterSelector<T extends string>({
  value,
  onChange,
  className,
  items,
  ...props
}: IFilterSelectorProps<T>) {
  const currentValue = (value?.[0] ?? 'All') as T | 'All';
  const currentDescription = useMemo(() => {
    return items.find((x) => (x.value as string) === currentValue)?.description || 'All';
  }, [currentValue, items]);

  const onValueChange = (val: string) => {
    if (val === 'All') {
      onChange(undefined);
    } else {
      onChange([val as T]);
    }
  };

  return (
    <Select value={currentValue as string} onValueChange={onValueChange}>
      <SelectTrigger
        {...props}
        size="sm"
        className={cn('focus:ring-0 focus:ring-offset-0', className)}
      >
        <SelectValue>{currentDescription}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-background shadow-none">
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
