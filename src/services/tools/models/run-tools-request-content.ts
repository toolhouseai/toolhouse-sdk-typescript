import { z } from 'zod';
import { antropicToolRequest, antropicToolRequestRequest, antropicToolRequestResponse } from './antropic-tool-request';
import { openAiToolRequest, openAiToolRequestRequest, openAiToolRequestResponse } from './open-ai-tool-request';

/**
 * The shape of the model inside the application code - what the users use
 */
export const runToolsRequestContent = z.lazy(() => {
  return z.union([antropicToolRequest, openAiToolRequest]);
});

/**
 *
 * @typedef  {RunToolsRequestContent} runToolsRequestContent
 * @property {AntropicToolRequest}
 * @property {OpenAiToolRequest} - Represents a tool call for OpenAI.
 */
export type RunToolsRequestContent = z.infer<typeof runToolsRequestContent>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const runToolsRequestContentResponse = z.lazy(() => {
  return z.union([antropicToolRequestResponse, openAiToolRequestResponse]);
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const runToolsRequestContentRequest = z.lazy(() => {
  return z.union([antropicToolRequestRequest, openAiToolRequestRequest]);
});
