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
import { useDeleteUser } from '../model';

export function RowDropdown({ id }: { id: number }) {
  const { deleteUser, isPending: deletePending } = useDeleteUser();
  const handleDeleteClick = () => deleteUser({ userId: id });

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
          {/* <DropdownMenuItem onClick={handleEditClick}>
                        <Pencil />
                        Изменить
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleChangeBannedClick}
                        disabled={changeAccessPending}
                    >
                        {banned ? <UserCheck /> : <Ban />}
                        {banned ? "Разблокировать" : "Заблокировать"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleResetClick}
                        disabled={resetPasswordPending}
                    >
                        <RotateCcw />
                        Сброс пароля
                    </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant={'destructive'}
            onClick={handleDeleteClick}
            disabled={deletePending}
          >
            <Trash />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
