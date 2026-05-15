import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeleteUser() {
  const utils = trpc.useUtils();
  const mutation = trpc.user.delete.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      utils.user.list.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deleteUser: mutation.mutate,
    deleteUserAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
