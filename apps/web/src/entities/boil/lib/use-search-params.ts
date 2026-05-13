import { useQueryStates } from 'nuqs';
import { boilsParamsSchema } from '../model';

export function useBoilsSearchParams() {
  const [params, setParams] = useQueryStates(boilsParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}
