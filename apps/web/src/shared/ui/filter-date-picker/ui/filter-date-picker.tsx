import { cn } from '@/shared/lib';
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/shared/ui';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export interface IFilterDatePickerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value' | 'onChange'
> {
  value: Date | undefined;
  onChange: (val: Date | undefined) => void;
  className?: string;
}

export function FilterDatePicker({ value, onChange, className, ...props }: IFilterDatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(value || new Date());

  const handleOpenChange = (open: boolean) => {
    setIsCalendarOpen(open);
    if (open && value) {
      setMonth(value);
    }
  };

  return (
    <Popover open={isCalendarOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          {...props}
          size="sm"
          variant="outline"
          className={cn(
            className,
            'justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'PPP', { locale: ru }) : 'Выберите дату'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          locale={ru}
          selected={value}
          month={month}
          onMonthChange={setMonth}
          onSelect={(date) => {
            onChange(date);
            setIsCalendarOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
