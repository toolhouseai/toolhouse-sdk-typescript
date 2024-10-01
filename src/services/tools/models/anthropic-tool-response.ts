import { z } from 'zod';
import { anthropicToolResponseType } from './anthropic-tool-response-type';

/**
 * The shape of the model inside the application code - what the users use
 */
export const anthropicToolResponse = z.lazy(() => {
  return z.object({
    tool_use_id: z.string(),
    content: z.string(),
    type: anthropicToolResponseType,
  });
});

/**
 * Represents the results of a tool call for Anthropic.
 * @typedef  {AnthropicToolResponse} anthropicToolResponse - Represents the results of a tool call for Anthropic. - Represents the results of a tool call for Anthropic.
 * @property {string}
 * @property {string}
 * @property {AnthropicToolResponseType}
 */
export type AnthropicToolResponse = z.infer<typeof anthropicToolResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const anthropicToolResponseResponse = z.lazy(() => {
  return z
    .object({
      tool_use_id: z.string(),
      content: z.string(),
      type: anthropicToolResponseType,
    })
    .transform((data) => ({
      tool_use_id: data['tool_use_id'],
      content: data['content'],
      type: data['type'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const anthropicToolResponseRequest = z.lazy(() => {
  return z
    .object({
      tool_use_id: z.string().nullish(),
      content: z.string().nullish(),
      type: anthropicToolResponseType.nullish(),
    })
    .transform((data) => ({
      tool_use_id: data['tool_use_id'],
      content: data['content'],
      type: data['type'],
    }));
});
