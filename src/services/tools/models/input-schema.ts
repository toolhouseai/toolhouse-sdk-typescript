import { z } from 'zod';
import { inputSchemaType } from './input-schema-type';

/**
 * The shape of the model inside the application code - what the users use
 */
export const inputSchema = z.lazy(() => {
  return z.object({
    type: inputSchemaType,
    properties: z.any(),
    required: z.array(z.string()),
  });
});

/**
 *
 * @typedef  {InputSchema} inputSchema
 * @property {InputSchemaType}
 * @property {any}
 * @property {string[]}
 */
export type InputSchema = z.infer<typeof inputSchema>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const inputSchemaResponse = z.lazy(() => {
  return z
    .object({
      type: inputSchemaType,
      properties: z.any(),
      required: z.array(z.string()),
    })
    .transform((data) => ({
      type: data['type'],
      properties: data['properties'],
      required: data['required'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const inputSchemaRequest = z.lazy(() => {
  return z
    .object({ type: inputSchemaType.nullish(), properties: z.any().nullish(), required: z.array(z.string()).nullish() })
    .transform((data) => ({
      type: data['type'],
      properties: data['properties'],
      required: data['required'],
    }));
});
