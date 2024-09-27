import { z } from 'zod';
import { getToolsRequestProvider } from './get-tools-request-provider';

/**
 * The shape of the model inside the application code - what the users use
 */
export const getToolsRequest = z.lazy(() => {
  return z.object({
    metadata: z.any().optional(),
    provider: getToolsRequestProvider,
    bundle: z.string().optional().nullable(),
  });
});

/**
 * Represents a tool call for Toolhouse.
 * @typedef  {GetToolsRequest} getToolsRequest - Represents a tool call for Toolhouse. - Represents a tool call for Toolhouse.
 * @property {any}
 * @property {GetToolsRequestProvider}
 * @property {string}
 */
export type GetToolsRequest = z.infer<typeof getToolsRequest>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const getToolsRequestResponse = z.lazy(() => {
  return z
    .object({
      metadata: z.any().optional(),
      provider: getToolsRequestProvider,
      bundle: z.string().optional().nullable(),
    })
    .transform((data) => ({
      metadata: data['metadata'],
      provider: data['provider'],
      bundle: data['bundle'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const getToolsRequestRequest = z.lazy(() => {
  return z
    .object({ metadata: z.any().nullish(), provider: getToolsRequestProvider.nullish(), bundle: z.string().nullish() })
    .transform((data) => ({
      metadata: data['metadata'],
      provider: data['provider'],
      bundle: data['bundle'],
    }));
});
