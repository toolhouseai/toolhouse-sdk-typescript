import { z } from 'zod';

export const argumentType = z.union([
  z.literal('string'),
  z.literal('number'),
  z.literal('integer'),
  z.literal('object'),
  z.literal('array'),
  z.literal('boolean'),
]);

export type ArgumentType = z.infer<typeof argumentType>;
