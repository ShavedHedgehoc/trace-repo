import { useQueryStates } from 'nuqs';
import { materialParamsSchema } from '../model';

export function useMaterialSearchParams() {
  const [params, setParams] = useQueryStates(materialParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}
