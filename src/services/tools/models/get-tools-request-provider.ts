import { z } from 'zod';

export const getToolsRequestProvider = z.union([
  z.literal('openai'),
  z.literal('anthropic'),
  z.literal('openai_assistants'),
]);

export type GetToolsRequestProvider = z.infer<typeof getToolsRequestProvider>;
