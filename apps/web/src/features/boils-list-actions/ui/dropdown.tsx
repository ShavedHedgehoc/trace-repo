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
import { useNavigate } from 'react-router-dom';

export function RowDropdown({ boilId }: { boilId: number }) {
  const navigate = useNavigate();
  const handleDetailClick = () => {
    navigate(`${ROUTE_PATH.HOME}/${boilId}`);
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
            Подробно
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
