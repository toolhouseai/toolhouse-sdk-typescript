import { z } from 'zod';
import { antropicToolRequestType } from './antropic-tool-request-type';

/**
 * The shape of the model inside the application code - what the users use
 */
export const antropicToolRequest = z.lazy(() => {
  return z.object({
    id: z.string(),
    input: z.any(),
    name: z.string(),
    type: antropicToolRequestType,
  });
});

/**
 *
 * @typedef  {AntropicToolRequest} antropicToolRequest
 * @property {string}
 * @property {any}
 * @property {string}
 * @property {AntropicToolRequestType}
 */
export type AntropicToolRequest = z.infer<typeof antropicToolRequest>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const antropicToolRequestResponse = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      input: z.any(),
      name: z.string(),
      type: antropicToolRequestType,
    })
    .transform((data) => ({
      id: data['id'],
      input: data['input'],
      name: data['name'],
      type: data['type'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const antropicToolRequestRequest = z.lazy(() => {
  return z
    .object({
      id: z.string().nullish(),
      input: z.any().nullish(),
      name: z.string().nullish(),
      type: antropicToolRequestType.nullish(),
    })
    .transform((data) => ({
      id: data['id'],
      input: data['input'],
      name: data['name'],
      type: data['type'],
    }));
});
