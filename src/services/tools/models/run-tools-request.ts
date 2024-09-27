import { z } from 'zod';
import { metadata, metadataRequest, metadataResponse } from './metadata';
import { runToolsRequestProvider } from './run-tools-request-provider';
import {
  runToolsRequestContent,
  runToolsRequestContentRequest,
  runToolsRequestContentResponse,
} from './run-tools-request-content';

/**
 * The shape of the model inside the application code - what the users use
 */
export const runToolsRequest = z.lazy(() => {
  return z.object({
    metadata: metadata,
    provider: runToolsRequestProvider,
    content: runToolsRequestContent,
    bundle: z.string().optional().nullable(),
  });
});

/**
 * Represents a tool call for Toolhouse.
 * @typedef  {RunToolsRequest} runToolsRequest - Represents a tool call for Toolhouse. - Represents a tool call for Toolhouse.
 * @property {Metadata} - Metadata Model
 * @property {RunToolsRequestProvider}
 * @property {RunToolsRequestContent}
 * @property {string}
 */
export type RunToolsRequest = z.infer<typeof runToolsRequest>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const runToolsRequestResponse = z.lazy(() => {
  return z
    .object({
      metadata: metadataResponse,
      provider: runToolsRequestProvider,
      content: runToolsRequestContentResponse,
      bundle: z.string().optional().nullable(),
    })
    .transform((data) => ({
      metadata: data['metadata'],
      provider: data['provider'],
      content: data['content'],
      bundle: data['bundle'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const runToolsRequestRequest = z.lazy(() => {
  return z
    .object({
      metadata: metadataRequest.nullish(),
      provider: runToolsRequestProvider.nullish(),
      content: runToolsRequestContentRequest.nullish(),
      bundle: z.string().nullish(),
    })
    .transform((data) => ({
      metadata: data['metadata'],
      provider: data['provider'],
      content: data['content'],
      bundle: data['bundle'],
    }));
});
