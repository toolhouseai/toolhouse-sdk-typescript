import { z } from 'zod';
import { propertyType } from './property-type';

/**
 * The shape of the model inside the application code - what the users use
 */
export const property = z.lazy(() => {
  return z.object({
    type: propertyType,
    description: z.string(),
  });
});

/**
 *
 * @typedef  {Property} property
 * @property {PropertyType}
 * @property {string}
 */
export type Property = z.infer<typeof property>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const propertyResponse = z.lazy(() => {
  return z
    .object({
      type: propertyType,
      description: z.string(),
    })
    .transform((data) => ({
      type: data['type'],
      description: data['description'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const propertyRequest = z.lazy(() => {
  return z.object({ type: propertyType.nullish(), description: z.string().nullish() }).transform((data) => ({
    type: data['type'],
    description: data['description'],
  }));
});
