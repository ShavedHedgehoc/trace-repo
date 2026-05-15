import { useQueryStates } from 'nuqs';
import { userParamsSchema } from '../model';

export function useUserSearchParams() {
  const [params, setParams] = useQueryStates(userParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}
