import { z } from 'zod';
import { inputSchema, inputSchemaRequest, inputSchemaResponse } from './input-schema';

/**
 * The shape of the model inside the application code - what the users use
 */
export const toolhouseApiModelsProvidersProvidersToolsAnthropicTool = z.lazy(() => {
  return z.object({
    name: z.string(),
    description: z.string(),
    inputSchema: inputSchema,
  });
});

/**
 *
 * @typedef  {ToolhouseApiModelsProvidersProvidersToolsAnthropicTool} toolhouseApiModelsProvidersProvidersToolsAnthropicTool
 * @property {string}
 * @property {string}
 * @property {InputSchema}
 */
export type ToolhouseApiModelsProvidersProvidersToolsAnthropicTool = z.infer<
  typeof toolhouseApiModelsProvidersProvidersToolsAnthropicTool
>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const toolhouseApiModelsProvidersProvidersToolsAnthropicToolResponse = z.lazy(() => {
  return z
    .object({
      name: z.string(),
      description: z.string(),
      input_schema: inputSchemaResponse,
    })
    .transform((data) => ({
      name: data['name'],
      description: data['description'],
      inputSchema: data['input_schema'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const toolhouseApiModelsProvidersProvidersToolsAnthropicToolRequest = z.lazy(() => {
  return z
    .object({
      name: z.string().nullish(),
      description: z.string().nullish(),
      inputSchema: inputSchemaRequest.nullish(),
    })
    .transform((data) => ({
      name: data['name'],
      description: data['description'],
      input_schema: data['inputSchema'],
    }));
});
