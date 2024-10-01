import { Environment } from './http/environment';
import { MetadataType, ProviderTypes, RequestConfig, SdkConfig } from './http/types';
import { GetToolsRequest, GetToolsRequestGetToolsPostOkResponse, OpenAiChatCompletion, OpenAiChatCompletionMessage, PublicTool, RunToolsRequest, RunToolsRequestContent, RunToolsResponseContent, ToolsService } from './services/tools';
import * as dotenv from 'dotenv';

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

  /**
  * This endpoint retrieves tools from a specific provider.
  * @returns {Promise<GetToolsRequestGetToolsPostOkResponse>} Successful Response
  */
  async getTools(
    bundle?: string,
    requestConfig?: RequestConfig,
  ): Promise<GetToolsRequestGetToolsPostOkResponse | undefined> {
    const body: GetToolsRequest = {
      provider: this.provider,
      metadata: this.metadata,
      bundle: bundle ?? 'default'
    }
    const { data } = await this.serviceTools.getTools(body, requestConfig)

    return data
  }

  /**
   * This endpoint runs a tool based on the specified provider and content.
   * @returns {Promise<RunToolsResponseContent[]>} Successful Response
   */
  async runTools(
    body: OpenAiChatCompletion,
    append?: boolean,
    requestConfig?: RequestConfig,
  ): Promise<RunToolsResponseContent[]> {
    if (body.choices[0].finish_reason !== 'tool_calls') {
      return [];
    }

    const message = body.choices[0].message;
    const tool_calls = message.tool_calls;

    if (tool_calls == null || tool_calls.length === 0) {
      return [];
    }

    const toolCallsPromises = tool_calls.map(async (toolCall) => {
      const content: RunToolsRequestContent = { ...toolCall }
      const toolBody: RunToolsRequest = {
        provider: this.provider,
        metadata: this.metadata,
        content
      }

      const { data } = await this.serviceTools.runTools(toolBody, requestConfig)
      return data?.content
    })
    //(RunToolsResponseContent | OpenAiChatCompletionMessage)
    const results: any[] = await Promise.all(toolCallsPromises);
    if (append !== false) {
      results.unshift(message)
    }

    return results.filter((result): result is RunToolsResponseContent => result !== undefined);
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
