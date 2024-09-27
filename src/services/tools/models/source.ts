import { z } from 'zod';

export const source = z.union([z.literal('llm'), z.literal('user'), z.literal('metadata')]);

export type Source = z.infer<typeof source>;
