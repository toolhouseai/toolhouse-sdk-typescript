import { z } from 'zod';

export const anthropicToolResponseType = z.literal('tool_result')

export type AnthropicToolResponseType = z.infer<typeof anthropicToolResponseType>;
