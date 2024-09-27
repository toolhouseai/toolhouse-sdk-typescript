import { z } from 'zod';

export const runToolsRequestProvider = z.union([
  z.literal('openai'),
  z.literal('anthropic'),
  z.literal('openai_assistants'),
]);

export type RunToolsRequestProvider = z.infer<typeof runToolsRequestProvider>;
