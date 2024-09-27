import { z } from 'zod';
import { openAiToolResponse, openAiToolResponseRequest, openAiToolResponseResponse } from './open-ai-tool-response';
import {
  anthropicToolResponse,
  anthropicToolResponseRequest,
  anthropicToolResponseResponse,
} from './anthropic-tool-response';

/**
 * The shape of the model inside the application code - what the users use
 */
export const runToolsResponseContent = z.lazy(() => {
  return z.union([openAiToolResponse, anthropicToolResponse]);
});

/**
 *
 * @typedef  {RunToolsResponseContent} runToolsResponseContent
 * @property {OpenAiToolResponse} - Represents the results of a tool call for OpenAI.
 * @property {AnthropicToolResponse} - Represents the results of a tool call for Anthropic.
 */
export type RunToolsResponseContent = z.infer<typeof runToolsResponseContent>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const runToolsResponseContentResponse = z.lazy(() => {
  return z.union([openAiToolResponseResponse, anthropicToolResponseResponse]);
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const runToolsResponseContentRequest = z.lazy(() => {
  return z.union([openAiToolResponseRequest, anthropicToolResponseRequest]);
});
