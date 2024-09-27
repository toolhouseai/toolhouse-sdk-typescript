import { z } from 'zod';
import { openAiFunction, openAiFunctionRequest, openAiFunctionResponse } from './open-ai-function';
import { openAiToolRequestType } from './open-ai-tool-request-type';

/**
 * The shape of the model inside the application code - what the users use
 */
export const openAiToolRequest = z.lazy(() => {
  return z.object({
    id: z.string(),
    function: openAiFunction,
    type: openAiToolRequestType,
  });
});

/**
 * Represents a tool call for OpenAI.
 * @typedef  {OpenAiToolRequest} openAiToolRequest - Represents a tool call for OpenAI. - Represents a tool call for OpenAI.
 * @property {string}
 * @property {OpenAiFunction} - Represents a function call for OpenAI.
 * @property {OpenAiToolRequestType}
 */
export type OpenAiToolRequest = z.infer<typeof openAiToolRequest>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const openAiToolRequestResponse = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      function: openAiFunctionResponse,
      type: openAiToolRequestType,
    })
    .transform((data) => ({
      id: data['id'],
      function: data['function'],
      type: data['type'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const openAiToolRequestRequest = z.lazy(() => {
  return z
    .object({
      id: z.string().nullish(),
      function: openAiFunctionRequest.nullish(),
      type: openAiToolRequestType.nullish(),
    })
    .transform((data) => ({
      id: data['id'],
      function: data['function'],
      type: data['type'],
    }));
});
