import { z } from 'zod';
import { runToolsResponseProvider } from './run-tools-response-provider';
import {
  runToolsResponseContent,
  runToolsResponseContentRequest,
  runToolsResponseContentResponse,
} from './run-tools-response-content';

/**
 * The shape of the model inside the application code - what the users use
 */
export const runToolsResponse = z.lazy(() => {
  return z.object({
    provider: runToolsResponseProvider,
    content: runToolsResponseContent,
  });
});

/**
 * Represents the results of a tool call for Toolhouse.
 * @typedef  {RunToolsResponse} runToolsResponse - Represents the results of a tool call for Toolhouse. - Represents the results of a tool call for Toolhouse.
 * @property {RunToolsResponseProvider}
 * @property {RunToolsResponseContent}
 */
export type RunToolsResponse = z.infer<typeof runToolsResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const runToolsResponseResponse = z.lazy(() => {
  return z
    .object({
      provider: runToolsResponseProvider,
      content: runToolsResponseContentResponse,
    })
    .transform((data) => ({
      provider: data['provider'],
      content: data['content'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const runToolsResponseRequest = z.lazy(() => {
  return z
    .object({ provider: runToolsResponseProvider.nullish(), content: runToolsResponseContentRequest.nullish() })
    .transform((data) => ({
      provider: data['provider'],
      content: data['content'],
    }));
});
