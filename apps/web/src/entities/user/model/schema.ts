import { type TGetUsersListInput } from '@repo/schemas';
import { type inferParserType, parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs';

export const userParamsSchema = {
  name: parseAsString.withDefault(''),
  email: parseAsString.withDefault(''),
  roles: parseAsArrayOf(parseAsInteger).withDefault([]),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TGetUsersListInput, unknown>;
export type UserParams = inferParserType<typeof userParamsSchema>;
