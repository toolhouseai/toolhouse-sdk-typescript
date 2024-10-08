import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const vercelToolResponse = z.lazy(() => {
  return z.object({
    content: z.string(),
  });
});

/**
 * Represents the results of a tool call for Anthropic.
 * @typedef  {VercelToolResponse} vercelToolResponse 
 * @property {string}
 */
export type VercelToolResponse = z.infer<typeof vercelToolResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const vercelToolResponseResponse = z.lazy(() => {
  return z
    .object({
      content: z.string(),
    })
    .transform((data) => ({
      content: data['content'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const vercelToolResponseRequest = z.lazy(() => {
  return z
    .object({
      content: z.string().nullish(),
    })
    .transform((data) => ({
      content: data['content'],
    }));
});
