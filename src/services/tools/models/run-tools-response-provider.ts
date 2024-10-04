import { z } from 'zod';

export const runToolsResponseProvider = z.union([
  z.literal('openai'),
  z.literal('anthropic'),
  z.literal('openai_assistants'),
  z.literal('vercel_ai'),
]);

export type RunToolsResponseProvider = z.infer<typeof runToolsResponseProvider>;
