import { useAuth } from '@/app/providers';
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
import { useDeletePlan } from '../model';

export function RowDropdown({
  boilId,
  isInactive = false,
}: {
  boilId: number;
  isInactive?: boolean;
}) {
  const { user } = useAuth();
  const { deletePlan, isPending: deletePending } = useDeletePlan();
  const allowedRole = 'Удаление варок';
  const allowDelete = user?.roles.includes(allowedRole) ?? false;
  const handleDetailClick = () => {
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}${ROUTE_PATH.BOIL_DETAIL_ROOT}/${boilId}`;
    window.open(fullUrl, '_blank', 'noreferrer');
  };

  const handleDeleteClick = () => {
    deletePlan({ boilId });
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isInactive}>
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
          <DropdownMenuItem
            variant={'destructive'}
            onClick={handleDeleteClick}
            disabled={deletePending || !allowDelete}
          >
            <ClipboardList />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
