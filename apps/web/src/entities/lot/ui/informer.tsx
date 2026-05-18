import { cn } from '@/shared/lib';
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui';
import { TriangleAlert } from 'lucide-react';

export function Informer() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" className={cn('h-8 w-8 p-0')}>
            <TriangleAlert className="text-red-700 dark:text-red-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-md!">
          <p>Нет плана</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
