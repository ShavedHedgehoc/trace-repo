import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeletePlan() {
  const utils = trpc.useUtils();
  const mutation = trpc.plan.delete.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      utils.boil.list.invalidate();
      utils.boil.getDetail.invalidate();
      utils.boil.getStats.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deletePlan: mutation.mutate,
    deletePlanAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
