import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useUpdateUserRoles() {
  const utils = trpc.useUtils();
  const mutation = trpc.user.updateRoles.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно обновлена');
      utils.user.list.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при обновлении');
    },
  });
  return {
    updateUserRoles: mutation.mutate,
    updateUserRolesAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
