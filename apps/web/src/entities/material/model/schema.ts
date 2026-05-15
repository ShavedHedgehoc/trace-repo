import { type TGetMaterialsListInput } from '@repo/schemas';
import { type inferParserType, parseAsInteger, parseAsString } from 'nuqs';

export const materialParamsSchema = {
  productId: parseAsString.withDefault(''),
  productName: parseAsString.withDefault(''),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TGetMaterialsListInput, unknown>;
export type MaterialParams = inferParserType<typeof materialParamsSchema>;
