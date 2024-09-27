import { z } from 'zod';
import { toolhouseApiModelsProvidersProvidersToolsOpenaiToolType } from './toolhouse-api-models-providers-providers-tools-openai-tool-type';
import { functionRequest, functionResponse, function_ } from './function_';

/**
 * The shape of the model inside the application code - what the users use
 */
export const toolhouseApiModelsProvidersProvidersToolsOpenaiTool = z.lazy(() => {
  return z.object({
    type: toolhouseApiModelsProvidersProvidersToolsOpenaiToolType,
    function: function_,
    required: z.array(z.string()),
  });
});

/**
 *
 * @typedef  {ToolhouseApiModelsProvidersProvidersToolsOpenaiTool} toolhouseApiModelsProvidersProvidersToolsOpenaiTool
 * @property {ToolhouseApiModelsProvidersProvidersToolsOpenaiToolType}
 * @property {Function_}
 * @property {string[]}
 */
export type ToolhouseApiModelsProvidersProvidersToolsOpenaiTool = z.infer<
  typeof toolhouseApiModelsProvidersProvidersToolsOpenaiTool
>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const toolhouseApiModelsProvidersProvidersToolsOpenaiToolResponse = z.lazy(() => {
  return z
    .object({
      type: toolhouseApiModelsProvidersProvidersToolsOpenaiToolType,
      function: functionResponse,
      required: z.array(z.string()),
    })
    .transform((data) => ({
      type: data['type'],
      function: data['function'],
      required: data['required'],
    }));
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const toolhouseApiModelsProvidersProvidersToolsOpenaiToolRequest = z.lazy(() => {
  return z
    .object({
      type: toolhouseApiModelsProvidersProvidersToolsOpenaiToolType.nullish(),
      function: functionRequest.nullish(),
      required: z.array(z.string()).nullish(),
    })
    .transform((data) => ({
      type: data['type'],
      function: data['function'],
      required: data['required'],
    }));
});
