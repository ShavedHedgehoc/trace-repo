import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { Trash } from 'lucide-react';

export interface IFilterResetButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'isDirty' | 'onClick'
> {
  isDirty: boolean;
  mobile: boolean;
  onClick: () => void;
  className?: string;
}

export function FilterResetButton({
  isDirty,
  onClick,
  className,
  mobile,
  ...props
}: IFilterResetButtonProps) {
  if (!isDirty) return null;
  return (
    <Button
      {...props}
      type="button"
      size="sm"
      variant={mobile ? 'outline' : 'ghost'}
      className={cn('py-0 px-3 text-xs', className)}
      onClick={onClick}
      disabled={!isDirty}
    >
      <Trash /> Сброс
    </Button>
  );
}
