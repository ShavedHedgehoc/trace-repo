import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeleteCellsContain() {
  const utils = trpc.useUtils();
  const mutation = trpc.cell.delete.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      utils.cell.list.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deleteCellsContain: mutation.mutate,
    deleteCellsContainAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
