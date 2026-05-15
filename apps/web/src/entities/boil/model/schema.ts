import { getMonthBounds } from '@/shared/lib';
import type { TGetBoilsListInput } from '@repo/schemas';
import {
  type inferParserType,
  parseAsArrayOf,
  parseAsInteger,
  parseAsIsoDate,
  parseAsString,
} from 'nuqs';

export const boilsParamsSchema = {
  batchName: parseAsString.withDefault(''),
  productId: parseAsString.withDefault(''),
  productMarking: parseAsString.withDefault(''),
  startDate: parseAsIsoDate.withDefault(getMonthBounds().start),
  endDate: parseAsIsoDate.withDefault(getMonthBounds().end),
  plants: parseAsArrayOf(parseAsString).withDefault([]),
  problem: parseAsArrayOf(parseAsString).withDefault([]),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TGetBoilsListInput, unknown>;
export type BoilsParams = inferParserType<typeof boilsParamsSchema>;
