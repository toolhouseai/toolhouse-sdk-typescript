import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const openAiFunction = z.lazy(() => {
  return z.object({
    arguments: z.any(),
    name: z.string(),
  });
});

/**
 * Represents a function call for OpenAI.
 * @typedef  {OpenAiFunction} openAiFunction - Represents a function call for OpenAI. - Represents a function call for OpenAI.
 * @property {any}
 * @property {string}
 */
export type OpenAiFunction = z.infer<typeof openAiFunction>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const openAiFunctionResponse = z.lazy(() => {
  return z
    .object({
      arguments: z.any(),
      name: z.string(),
    })
    .transform((data) => ({
      arguments: data['arguments'],
      name: data['name'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const openAiFunctionRequest = z.lazy(() => {
  return z.object({ arguments: z.any().nullish(), name: z.string().nullish() }).transform((data) => ({
    arguments: data['arguments'],
    name: data['name'],
  }));
});
