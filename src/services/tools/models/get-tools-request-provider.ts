import { z } from 'zod';

export const getToolsRequestProvider = z.union([
  z.literal('openai'),
  z.literal('anthropic'),
  z.literal('openai_assistants'),
  z.literal('vercel_ai'),
]);

export type GetToolsRequestProvider = z.infer<typeof getToolsRequestProvider>;
