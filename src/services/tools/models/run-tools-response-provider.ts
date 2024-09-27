import { z } from 'zod';

export const runToolsResponseProvider = z.union([
  z.literal('openai'),
  z.literal('anthropic'),
  z.literal('openai_assistants'),
]);

export type RunToolsResponseProvider = z.infer<typeof runToolsResponseProvider>;
