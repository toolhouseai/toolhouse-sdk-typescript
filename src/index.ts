import { Environment } from './http/environment';
import { MetadataType, ProviderTypes, RequestConfig, SdkConfig } from './http/types';
import { AnthropicToolResponse, GetToolsRequest, OpenAiToolResponse, PublicTool, RunToolsRequest, RunToolsRequestContent, ToolsService } from './services/tools';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { AnthropicToolResponseMessage } from './services/tools/models/anthropic-tool-response';
export * from './services/tools';
export type * from './http';

dotenv.config();

const defaultApiKey = process.env.TOOLHOUSE_API_KEY

export default class Toolhouse {
  private _provider: ProviderTypes;
  private _metadata: MetadataType;
  private _serviceTools: ToolsService;

  constructor(public config: SdkConfig) {
    const baseUrl = config.environment || config.baseUrl || Environment.DEFAULT;
    this.config = {
      ...config,
      baseUrl,
    };
    if (config.apiKey == null && defaultApiKey == null)
      throw new Error('Invalid configuration, check your Enviromnent variables')
    this.apiKey = config.apiKey ?? defaultApiKey!
    this._provider = config.provider ?? 'openai'
    this._metadata = config.metadata ?? {}
    this._serviceTools = new ToolsService(this.config);
  }

  /**
  * This endpoint retrieves a list of public tools available on Toolhouse.
  * @returns {PublicTool[]} Successful Response
  */
  async tools(requestConfig?: RequestConfig): Promise<PublicTool[] | undefined> {
    const { data } = await this.serviceTools.tools(requestConfig)

    return data
  }

  async getTools(provider: 'openai', bundle?: string, requestConfig?: RequestConfig): Promise<OpenAI.ChatCompletionTool[] | undefined>;
  async getTools(provider: 'anthropic', bundle?: string, requestConfig?: RequestConfig): Promise<Anthropic.Messages.Tool[] | undefined>;
  /**
  * This endpoint retrieves tools from a specific provider.
  * @returns {Promise<OpenAI.ChatCompletionTool[] | Anthropic.Messages.Tool[]>} Successful Response
  */
  async getTools(
    provider: ProviderTypes,
    bundle?: string,
    requestConfig?: RequestConfig,
  ): Promise<OpenAI.ChatCompletionTool[] | Anthropic.Messages.Tool[] | undefined> {
    const body: GetToolsRequest = {
      provider: provider,
      metadata: this.metadata,
      bundle: bundle ?? 'default',
    };
    const { data } = await this.serviceTools.getTools(body, requestConfig);

    if (data == null) return data

    if (provider === 'openai') {
      return data as OpenAI.ChatCompletionTool[]
    } else if (provider === 'anthropic') {
      return data as Anthropic.Messages.Tool[]
    }

    throw new Error(`Unsupported provider: ${provider}`);
  }

  /**
 * This endpoint runs a tool based on the specified provider and content.
 * @returns {Promise<OpenAiToolResponse | OpenAI.ChatCompletionMessageParam[]>} Successful Response for OpenAI
 */
  async runTools(body: OpenAI.ChatCompletion, provider: 'openai', append?: boolean, requestConfig?: RequestConfig): Promise<(OpenAiToolResponse | OpenAI.ChatCompletionMessageParam)[]>

  /**
   * This endpoint runs a tool based on the specified provider and content.
   * @returns {Promise<AnthropicToolResponse | Anthropic.Messages.Message[]>} Successful Response for Anthropic
   */
  async runTools(body: Anthropic.Messages.Message, provider: 'anthropic', append?: boolean, requestConfig?: RequestConfig): Promise<(Anthropic.Messages.MessageParam)[]>

  /**
   * This endpoint runs a tool based on the specified provider and content.
   * @returns {Promise<OpenAiToolResponse | OpenAI.ChatCompletionMessageParam[] | Anthropic.Messages.MessageParam[]>} Successful Response
   */
  async runTools(
    body: OpenAI.ChatCompletion | Anthropic.Messages.Message,
    provider: ProviderTypes,
    append?: boolean,
    requestConfig?: RequestConfig
  ): Promise<(OpenAiToolResponse | OpenAI.ChatCompletionMessageParam)[] | (Anthropic.Messages.MessageParam)[]> {
    if (provider === 'openai') {
      if ('choices' in body) {
        if (body.choices[0].finish_reason !== 'tool_calls') {
          return [];
        }

        const message = body.choices[0].message;
        const tool_calls = message.tool_calls;

        if (tool_calls == null || tool_calls.length === 0) {
          return [];
        }

        const toolCallsPromises = tool_calls.map(async (toolCall) => {
          try {
            const content: RunToolsRequestContent = { ...toolCall };
            const toolBody: RunToolsRequest = {
              provider: this.provider,
              metadata: this.metadata,
              content,
            };

            const { data } = await this.serviceTools.runTools(toolBody, requestConfig);
            return data?.content;
          } catch (error) {
            return undefined;
          }
        });

        const results = (await Promise.all(toolCallsPromises))
          .filter((result) => result !== undefined) as (OpenAiToolResponse | OpenAI.ChatCompletionMessageParam)[];

        if (append !== false) {
          results.unshift(message);
        }

        return results;
      }
    } else if (provider === 'anthropic') {
      if ('content' in body) {
        if (body.stop_reason !== 'tool_use') {
          return [];
        }

        const tool_calls = body.content;

        if (tool_calls == null || tool_calls.length === 0) {
          return [];
        }

        const toolCallsPromises = tool_calls.map(async (toolCall) => {
          try {
            if (toolCall.type === 'tool_use') {
              const content: RunToolsRequestContent = { ...toolCall };
              const toolBody: RunToolsRequest = {
                provider: this.provider,
                metadata: this.metadata,
                content,
              };

              const { data } = await this.serviceTools.runTools(toolBody, requestConfig)

              return data?.content
            } else if (toolCall.type === 'text') {
              return undefined;
            } else {
              return undefined;
            }
          } catch (error) {
            return undefined;
          }
        });

        const results = (await Promise.all(toolCallsPromises))
          .filter((result) => result !== undefined) as (AnthropicToolResponse | Anthropic.Messages.MessageParam)[];

        const messages = [{ role: 'user', content: results }]

        if (append !== false) {
          const message = { role: 'assistant', content: tool_calls }
          messages.unshift(message as any)
        }

        return messages as Anthropic.Messages.MessageParam[]
      }
    }

    return [];
  }

  public get metadata(): MetadataType {
    return this._metadata;
  }

  public get provider(): ProviderTypes {
    return this._provider;
  }

  public get serviceTools(): ToolsService {
    return this._serviceTools;
  }

  set baseUrl(baseUrl: string) {
    this.config.baseUrl = baseUrl;
  }

  set environment(environment: Environment) {
    this.config.environment = environment;
  }

  set timeoutMs(timeoutMs: number) {
    this.config.timeoutMs = timeoutMs;
  }

  set apiKey(apiKey: string) {
    this.config.apiKey = apiKey;
  }

  public set metadata(metadata: MetadataType) {
    this._metadata = { ...this._metadata, ...metadata }
  }

  public set provider(provider: ProviderTypes) {
    this._provider = provider;
  }

  public set serviceTools(tools: ToolsService) {
    this._serviceTools = tools;
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
