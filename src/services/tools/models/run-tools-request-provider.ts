import { z } from 'zod';

export const runToolsRequestProvider = z.union([
  z.literal('openai'),
  z.literal('anthropic'),
  z.literal('openai_assistants'),
  z.literal('vercel'),
]);

export type RunToolsRequestProvider = z.infer<typeof runToolsRequestProvider>;
