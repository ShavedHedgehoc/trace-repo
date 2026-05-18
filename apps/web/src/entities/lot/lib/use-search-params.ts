import { useQueryStates } from 'nuqs';
import { lotDetailParamsSchema } from '../model';

export function useLotDetailSearchParams() {
  const [params, setParams] = useQueryStates(lotDetailParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}
