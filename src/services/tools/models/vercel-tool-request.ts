import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const vercelAiToolRequest = z.lazy(() => {
  return z.object({
    input: z.any(),
    name: z.string(),
  });
});

/**
 *
 * @typedef  {VercelAiToolRequest} vercelAiToolRequest
 * @property {any}
 * @property {string}
 */
export type VercelAiToolRequest = z.infer<typeof vercelAiToolRequest>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const vercelAiToolRequestResponse = z.lazy(() => {
  return z
    .object({
      input: z.any(),
      name: z.string(),
    })
    .transform((data) => ({
      input: data['input'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const vercelAiToolRequestRequest = z.lazy(() => {
  return z
    .object({
      input: z.any().nullish(),
      name: z.string().nullish(),
    })
    .transform((data) => ({
      input: data['input'],
      name: data['name'],
    }));
});
