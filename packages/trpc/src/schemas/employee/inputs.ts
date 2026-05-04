import { z } from 'zod';

export const getEmployeesFilterAppSchema = z.object({
  name: z.string().default(''),
  nameAsc: z.boolean().default(true),
  occupations: z.array(z.number()).default([]),
});

export const getEmployeesListAppInputSchema = z.object({
  filter: getEmployeesFilterAppSchema,
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export type TGetEmployeesFilterApp = z.infer<typeof getEmployeesFilterAppSchema>;
export type TGetEmployeeListInputApp = z.infer<typeof getEmployeesListAppInputSchema>;
