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

export interface IListItem {
  value: string;
  description: string;
}

export interface IFilterSelectorProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange'
> {
  value: string[] | undefined;
  onChange: (val: string[] | undefined | null) => void;
  className?: string;
  items: readonly IListItem[];
}

export function FilterSelector({
  value,
  onChange,
  className,
  items,
  ...props
}: IFilterSelectorProps) {
  const currentValue = value?.[0] ?? 'All';
  const currentDescription = useMemo(() => {
    return items.find((x) => x.value === currentValue)?.description || 'All';
  }, [currentValue, items]);

  const onValueChange = (val: string) => {
    if (val === 'All') {
      onChange(undefined);
    } else {
      onChange([val]);
    }
  };

  return (
    <Select value={currentValue} onValueChange={onValueChange}>
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
