import { z } from 'zod';
import { toolType } from './tool-type';
import { argument, argumentRequest, argumentResponse } from './argument';

/**
 * The shape of the model inside the application code - what the users use
 */
export const publicTool = z.lazy(() => {
  return z.object({
    id: z.string(),
    publisher: z.string(),
    tool_type: toolType.optional(),
    logo: z.string().regex(/^data:image\/svg\+xml;base64,/),
    title: z.string(),
    category: z.string(),
    short_description: z.string(),
    long_description: z.string(),
    price_per_execution: z.number().gte(0),
    star_rating: z.number().gte(0).lte(5),
    executions: z.number(),
    description_for_model: z.string(),
    arguments: z.array(argument),
  });
});

/**
 * ToolHouse Tools Configuration
 * @typedef  {PublicTool} publicTool - ToolHouse Tools Configuration - ToolHouse Tools Configuration
 * @property {string}
 * @property {string}
 * @property {ToolType}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {number}
 * @property {number}
 * @property {number}
 * @property {string}
 * @property {Argument[]}
 */
export type PublicTool = z.infer<typeof publicTool>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const publicToolResponse = z.lazy(() => {
  return z
    .object({
      id: z.string(),
      publisher: z.string(),
      tool_type: toolType.optional(),
      logo: z.string().regex(/^data:image\/svg\+xml;base64,/),
      title: z.string(),
      category: z.string(),
      short_description: z.string(),
      long_description: z.string(),
      price_per_execution: z.number().gte(0),
      star_rating: z.number().gte(0).lte(5),
      executions: z.number(),
      description_for_model: z.string(),
      arguments: z.array(argumentResponse),
    })
    .transform((data) => ({
      id: data['id'],
      publisher: data['publisher'],
      tool_type: data['tool_type'],
      logo: data['logo'],
      title: data['title'],
      category: data['category'],
      short_description: data['short_description'],
      long_description: data['long_description'],
      price_per_execution: data['price_per_execution'],
      star_rating: data['star_rating'],
      executions: data['executions'],
      description_for_model: data['description_for_model'],
      arguments: data['arguments'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const publicToolRequest = z.lazy(() => {
  return z
    .object({
      id: z.string().nullish(),
      publisher: z.string().nullish(),
      tool_type: toolType.nullish(),
      logo: z.string().nullish(),
      title: z.string().nullish(),
      category: z.string().nullish(),
      short_description: z.string().nullish(),
      long_description: z.string().nullish(),
      price_per_execution: z.number().nullish(),
      star_rating: z.number().nullish(),
      executions: z.number().nullish(),
      description_for_model: z.string().nullish(),
      arguments: z.array(argumentRequest).nullish(),
    })
    .transform((data) => ({
      id: data['id'],
      publisher: data['publisher'],
      tool_type: data['tool_type'],
      logo: data['logo'],
      title: data['title'],
      category: data['category'],
      short_description: data['short_description'],
      long_description: data['long_description'],
      price_per_execution: data['price_per_execution'],
      star_rating: data['star_rating'],
      executions: data['executions'],
      description_for_model: data['description_for_model'],
      arguments: data['arguments'],
    }));
});
