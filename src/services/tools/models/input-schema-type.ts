import { z } from 'zod';

export const inputSchemaType = z.literal('object')

export type InputSchemaType = z.infer<typeof inputSchemaType>;
