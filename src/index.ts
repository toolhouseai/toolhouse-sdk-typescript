import { Environment } from './http/environment';
import { MetadataType, ProviderTypes, RequestConfig, SdkConfig } from './http/types';
import { GetToolsRequest, OpenAiToolResponse, PublicTool, RunToolsRequest, RunToolsRequestContent, ToolsService } from './services/tools';
import { CoreTool, jsonSchema } from 'ai';
import { ToolhouseApiModelsGenericProvider } from './services/tools/models/toolhouse-api-models-providers-providers-tools-anthropic-tool';
import { readEnv } from './utils';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

export type * from './http';

interface ToolhouseError {
  metadata: {
    status: number;
  };
}

export class Toolhouse {
  private _provider: ProviderTypes;
  private _metadata: MetadataType;
  private _serviceTools: ToolsService;

  constructor(public config: SdkConfig) {
    const baseUrl = config.environment || config.baseUrl || Environment.DEFAULT;
    this.config = {
      ...config,
      baseUrl,
    }
    let key = config.apiKey
    if (key == null) {
      const defaultKey = readEnv('TOOLHOUSE_API_KEY')
      if (defaultKey == null)
        throw new Error('The api_key client option must be set either by passing api_key to the SDK or by setting the TOOLHOUSE_API_KEY environment variable')
      key = defaultKey
    }
    this.apiKey = key
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

  /**
  * This endpoint retrieves tools from a specific provider.
  * @returns {Promise<OpenAI.ChatCompletionTool[] | Anthropic.Messages.Tool[] | Record<string, CoreTool<any, any>>>} Successful Response
  */
  async getTools(
    bundle?: string,
    requestConfig?: RequestConfig
  ): Promise<OpenAI.ChatCompletionTool[] | Anthropic.Messages.Tool[] | Record<string, CoreTool<any, any>>> {
    const body: GetToolsRequest = {
      provider: this.provider,
      metadata: this.metadata,
      bundle: bundle ?? 'default',
    };
    const { data } = await this.serviceTools.getTools(body, requestConfig);

    if (data == null) return []

    if (this.provider === 'vercel') {

      return (data as ToolhouseApiModelsGenericProvider[]).reduce((tools, tool) => {
        tools[tool.name] = {
          description: tool.description,
          parameters: jsonSchema({
            type: 'object',
            properties: tool.arguments.reduce((args, argument) => {
              args[argument.name] = {
                type: argument.type,
                description: argument.description
              }

              return args
            }, {} as Record<string, { type: "string" | "number" | "boolean" | "object" | "integer" | "array", description: string }>)
          }),
          execute: async (params) => {
            const toolBody: RunToolsRequest = {
              provider: this.provider,
              metadata: this.metadata,
              content: {
                name: tool.name,
                input: params
              }
            }
            try {
              const { data } = await this.serviceTools.runTools(toolBody, requestConfig)
              return data?.content.content
            } catch (error) {
              if (error && (error as ToolhouseError).metadata?.status === 402) {
                return `ERROR: Notify the user to add Toolhouse Execution credits (Execs) to their account with the message: Unable to execute the ${tool.name} tool. Your account has run out of Toolhouse Execs. Please visit https://app.toolhouse.ai/billing to top up your Execs balance.`
              }
              return null
            }
          }
        }

        return tools
      }, {} as Record<string, CoreTool<any, any>>)
    }

    return data as OpenAI.ChatCompletionTool[] | Anthropic.Messages.Tool[]
  }

  /**
   * This endpoint runs a tool based on the specified provider and content.
   * @returns {Promise<OpenAiToolResponse | OpenAI.ChatCompletionMessageParam[] | Anthropic.Messages.MessageParam[]>} Successful Response
   */
  async runTools(
    body: OpenAI.ChatCompletion | Anthropic.Messages.Message,
    append?: boolean,
    requestConfig?: RequestConfig
  ): Promise<(OpenAiToolResponse | OpenAI.ChatCompletionMessageParam)[] | (Anthropic.Messages.MessageParam)[]> {
    if (this.provider === 'openai') {
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
    } else if (this.provider === 'anthropic') {
      if ('content' in body) {
        if (body.stop_reason !== 'tool_use') {
          return [];
        }

        const tool_calls = body.content;

        if (tool_calls == null || tool_calls.length === 0) {
          return [];
        }

        const toolCallsPromises = tool_calls.map(async (toolCall) => {
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
        })

        const results = (await Promise.all(toolCallsPromises))
          .filter((result) => result !== undefined) as Anthropic.Messages.ToolResultBlockParam[];

        const messages: Anthropic.Messages.MessageParam[] = [{ role: 'user', content: results }]

        if (append !== false) {
          const message: Anthropic.Messages.MessageParam = { role: 'assistant', content: tool_calls }
          messages.unshift(message)
        }

        return messages
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
