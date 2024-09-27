import { z } from 'zod';
import {
  toolhouseApiModelsProvidersProvidersToolsOpenaiTool,
} from './toolhouse-api-models-providers-providers-tools-openai-tool';
import {
  toolhouseApiModelsProvidersProvidersToolsAnthropicTool,
} from './toolhouse-api-models-providers-providers-tools-anthropic-tool';

/**
 * The shape of the model inside the application code - what the users use
 */
export const getToolsRequestGetToolsPostOkResponse = z.lazy(() => {
  return z.union([
    z.array(toolhouseApiModelsProvidersProvidersToolsOpenaiTool),
    z.array(toolhouseApiModelsProvidersProvidersToolsAnthropicTool),
  ]);
});

/**
 *
 * @typedef  {GetToolsRequestGetToolsPostOkResponse} getToolsRequestGetToolsPostOkResponse
 * @property {ToolhouseApiModelsProvidersProvidersToolsOpenaiTool[]}
 * @property {ToolhouseApiModelsProvidersProvidersToolsAnthropicTool[]}
 */
export type GetToolsRequestGetToolsPostOkResponse = z.infer<typeof getToolsRequestGetToolsPostOkResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const getToolsRequestGetToolsPostOkResponseResponse = z.lazy(() => {
  return z.union([
    z.array(toolhouseApiModelsProvidersProvidersToolsOpenaiTool),
    z.array(toolhouseApiModelsProvidersProvidersToolsAnthropicTool),
  ]);
});

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const getToolsRequestGetToolsPostOkResponseRequest = z.lazy(() => {
  return z.union([
    z.array(toolhouseApiModelsProvidersProvidersToolsOpenaiTool),
    z.array(toolhouseApiModelsProvidersProvidersToolsAnthropicTool),
  ]);
});
