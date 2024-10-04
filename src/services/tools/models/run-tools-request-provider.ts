import { z } from 'zod';

export const runToolsRequestProvider = z.union([
  z.literal('openai'),
  z.literal('anthropic'),
  z.literal('openai_assistants'),
  z.literal('vercel_ai'),
]);

export type RunToolsRequestProvider = z.infer<typeof runToolsRequestProvider>;
