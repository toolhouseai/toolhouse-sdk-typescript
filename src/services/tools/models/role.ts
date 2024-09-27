import { z } from 'zod';

export const role = z.literal('tool')

export type Role = z.infer<typeof role>;
