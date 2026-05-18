import type { TGetLotDetailInput } from '@repo/schemas';
import { type inferParserType, parseAsInteger } from 'nuqs';

export const lotDetailParamsSchema = {
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof Omit<TGetLotDetailInput, 'lotId'>, unknown>;

export type LotDetailsParams = inferParserType<typeof lotDetailParamsSchema>;
