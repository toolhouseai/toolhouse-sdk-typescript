import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const metadata = z.lazy(() => {
  return z.object({
    toolhouseId: z.string().optional().nullable(),
    toolhouseTimezone: z.number().optional().nullable(),
  });
});

/**
 * Metadata Model
 * @typedef  {Metadata} metadata - Metadata Model - Metadata Model
 * @property {string}
 * @property {number}
 */
export type Metadata = z.infer<typeof metadata>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const metadataResponse = z.lazy(() => {
  return z
    .object({
      toolhouse_id: z.string().optional().nullable(),
      toolhouse_timezone: z.number().optional().nullable(),
    })
    .transform((data) => ({
      toolhouseId: data['toolhouse_id'],
      toolhouseTimezone: data['toolhouse_timezone'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const metadataRequest = z.lazy(() => {
  return z.object({ toolhouseId: z.string().nullish(), toolhouseTimezone: z.number().nullish() }).transform((data) => ({
    toolhouse_id: data['toolhouseId'],
    toolhouse_timezone: data['toolhouseTimezone'],
  }));
});
