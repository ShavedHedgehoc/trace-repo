import { cn } from '@/shared/lib';
import { Button, ButtonGroup, Input } from '@/shared/ui';
import { X } from 'lucide-react';

export interface IFilterInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
> {
  value: string | undefined;
  onChange: (val: string | undefined) => void;
  className?: string;
}

export function FilterInput({ value, onChange, className, ...props }: IFilterInputProps) {
  const handleReset = () => {
    onChange(undefined);
  };

  return (
    <ButtonGroup className={cn('h-8 w-auto', className)}>
      <Input
        {...props}
        value={value || ''}
        onChange={(e) => onChange(e.target.value || undefined)}
        className={cn(
          'h-8 w-auto',
          'ring-0! ring-offset-0! ',
          'outline-none! focus-visible:outline-none!',
          'focus:border-input focus-visible:border-input',
          'relative focus:z-10',
        )}
      />
      <Button
        type="button" // Чтобы случайно не отправить форму
        variant="outline"
        size="sm"
        onClick={handleReset}
        className={cn(
          ' border-l-0 h-8 px-2',
          'focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none',
        )}
      >
        <X className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  );
}
