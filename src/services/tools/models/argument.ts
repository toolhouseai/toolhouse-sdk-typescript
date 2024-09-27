import { z } from 'zod';
import { argumentType } from './argument-type';
import { source } from './source';

/**
 * The shape of the model inside the application code - what the users use
 */
export const argument = z.lazy(() => {
  return z.object({
    name: z.string(),
    type: argumentType,
    source: source,
    label: z.string(),
    description: z.string(),
    required: z.boolean(),
  });
});

/**
 * Tool Arguments
 * @typedef  {Argument} argument - Tool Arguments - Tool Arguments
 * @property {string}
 * @property {ArgumentType}
 * @property {Source}
 * @property {string}
 * @property {string}
 * @property {boolean}
 */
export type Argument = z.infer<typeof argument>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const argumentResponse = z.lazy(() => {
  return z
    .object({
      name: z.string(),
      type: argumentType,
      source: source,
      label: z.string(),
      description: z.string(),
      required: z.boolean(),
    })
    .transform((data) => ({
      name: data['name'],
      type: data['type'],
      source: data['source'],
      label: data['label'],
      description: data['description'],
      required: data['required'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const argumentRequest = z.lazy(() => {
  return z
    .object({
      name: z.string().nullish(),
      type: argumentType.nullish(),
      source: source.nullish(),
      label: z.string().nullish(),
      description: z.string().nullish(),
      required: z.boolean().nullish(),
    })
    .transform((data) => ({
      name: data['name'],
      type: data['type'],
      source: data['source'],
      label: data['label'],
      description: data['description'],
      required: data['required'],
    }));
});
