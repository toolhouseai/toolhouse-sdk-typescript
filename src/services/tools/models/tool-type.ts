import { z } from 'zod';

export const toolType = z.union([z.literal('local'), z.literal('remote')]);

export type ToolType = z.infer<typeof toolType>;
