import { z } from 'zod';

export const propertyType = z.union([
  z.literal('string'),
  z.literal('number'),
  z.literal('integer'),
  z.literal('object'),
  z.literal('array'),
  z.literal('boolean'),
]);

export type PropertyType = z.infer<typeof propertyType>;
