import { useQueryStates } from 'nuqs';
import { trademarksParamsSchema } from '../model';

export function useTrademarksSearchParams() {
  const [params, setParams] = useQueryStates(trademarksParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}
