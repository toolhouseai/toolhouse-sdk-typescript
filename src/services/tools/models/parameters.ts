import { z } from 'zod';
import { parametersType } from './parameters-type';

/**
 * The shape of the model inside the application code - what the users use
 */
export const parameters = z.lazy(() => {
  return z.object({
    type: parametersType,
    properties: z.any(),
  });
});

/**
 *
 * @typedef  {Parameters} parameters
 * @property {ParametersType}
 * @property {any}
 */
export type Parameters = z.infer<typeof parameters>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const parametersResponse = z.lazy(() => {
  return z
    .object({
      type: parametersType,
      properties: z.any(),
    })
    .transform((data) => ({
      type: data['type'],
      properties: data['properties'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const parametersRequest = z.lazy(() => {
  return z.object({ type: parametersType.nullish(), properties: z.any().nullish() }).transform((data) => ({
    type: data['type'],
    properties: data['properties'],
  }));
});
