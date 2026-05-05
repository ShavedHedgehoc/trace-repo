import type { TGetTrademarksListInput } from '@repo/schemas';
import { type inferParserType, parseAsInteger, parseAsString } from 'nuqs';

export const trademarksParamsSchema = {
  trademarkName: parseAsString.withDefault(''),
  productName: parseAsString.withDefault(''),
  productCode: parseAsString.withDefault(''),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TGetTrademarksListInput, any>;
export type TrademarksParams = inferParserType<typeof trademarksParamsSchema>;
