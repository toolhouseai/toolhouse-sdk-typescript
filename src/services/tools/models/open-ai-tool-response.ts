import { z } from 'zod';
import { role } from './role';

/**
 * The shape of the model inside the application code - what the users use
 */
export const openAiToolResponse = z.lazy(() => {
  return z.object({
    role: role,
    toolCallId: z.string(),
    name: z.string(),
    content: z.string(),
  });
});

/**
 * Represents the results of a tool call for OpenAI.
 * @typedef  {OpenAiToolResponse} openAiToolResponse - Represents the results of a tool call for OpenAI. - Represents the results of a tool call for OpenAI.
 * @property {Role}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type OpenAiToolResponse = z.infer<typeof openAiToolResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const openAiToolResponseResponse = z.lazy(() => {
  return z
    .object({
      role: role,
      tool_call_id: z.string(),
      name: z.string(),
      content: z.string(),
    })
    .transform((data) => ({
      role: data['role'],
      toolCallId: data['tool_call_id'],
      name: data['name'],
      content: data['content'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const openAiToolResponseRequest = z.lazy(() => {
  return z
    .object({
      role: role.nullish(),
      toolCallId: z.string().nullish(),
      name: z.string().nullish(),
      content: z.string().nullish(),
    })
    .transform((data) => ({
      role: data['role'],
      tool_call_id: data['toolCallId'],
      name: data['name'],
      content: data['content'],
    }));
});
