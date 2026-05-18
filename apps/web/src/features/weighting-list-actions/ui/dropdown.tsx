import { ROUTE_PATH } from '@/shared/constants';
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/ui';
import { ClipboardList, MoreHorizontal } from 'lucide-react';

export function RowDropdown({ lotId }: { lotId: number }) {
  const handleDetailClick = () => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${ROUTE_PATH.LOT_DETAIL_ROOT}/${lotId}`;
    window.open(fullUrl, '_blank', 'noreferrer');
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Действия</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDetailClick}>
            <ClipboardList />
            Квазипартия
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
