import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/ui';
import { MoreHorizontal, Trash } from 'lucide-react';
import { useDeleteCellsContain } from '../model';

export function RowDropdown({ cellsContainId }: { cellsContainId: number }) {
  const { deleteCellsContain, isPending } = useDeleteCellsContain();
  const handleDeleteClick = () => deleteCellsContain({ cellsContainId });
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
          <DropdownMenuItem
            variant={'destructive'}
            onClick={handleDeleteClick}
            disabled={isPending}
          >
            <Trash />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
