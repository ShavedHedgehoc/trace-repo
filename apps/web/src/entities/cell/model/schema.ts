import { SortableColumns, type TGetCellsContainListInput } from '@repo/schemas';
import {
  type inferParserType,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs';

export const cellsContainParamsSchema = {
  cellName: parseAsString.withDefault(''),
  productId: parseAsString.withDefault(''),
  productName: parseAsString.withDefault(''),
  order: parseAsArrayOf(parseAsStringLiteral(SortableColumns)).withDefault([]),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TGetCellsContainListInput, unknown>;
export type CellsContainParams = inferParserType<typeof cellsContainParamsSchema>;
