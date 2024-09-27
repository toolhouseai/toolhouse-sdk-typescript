import { z } from 'zod';
import { parameters, parametersRequest, parametersResponse } from './parameters';

/**
 * The shape of the model inside the application code - what the users use
 */
export const function_ = z.lazy(() => {
  return z.object({
    name: z.string(),
    description: z.string(),
    parameters: parameters,
  });
});

/**
 *
 * @typedef  {Function_} function_
 * @property {string}
 * @property {string}
 * @property {Parameters}
 */
export type Function_ = z.infer<typeof function_>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const functionResponse = z.lazy(() => {
  return z
    .object({
      name: z.string(),
      description: z.string(),
      parameters: parametersResponse,
    })
    .transform((data) => ({
      name: data['name'],
      description: data['description'],
      parameters: data['parameters'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const functionRequest = z.lazy(() => {
  return z
    .object({ name: z.string().nullish(), description: z.string().nullish(), parameters: parametersRequest.nullish() })
    .transform((data) => ({
      name: data['name'],
      description: data['description'],
      parameters: data['parameters'],
    }));
});
