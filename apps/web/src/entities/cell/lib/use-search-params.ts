import { useQueryStates } from 'nuqs';
import { cellsContainParamsSchema } from '../model';

export function useCellsContainSearchParams() {
  const [params, setParams] = useQueryStates(cellsContainParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}
