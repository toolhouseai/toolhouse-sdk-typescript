import z from 'zod';
import { Environment } from './http/environment';
import { RequestBuilder } from './http/transport/request-builder';
import { ContentType, HttpResponse, MetadataType, ProviderTypes, RequestConfig, SdkConfig } from './http/types';
import { GetToolsRequest, GetToolsRequestGetToolsPostOkResponse, PublicTool, RunToolsRequest, RunToolsResponse } from './services/tools';
import { publicToolResponse } from './services/tools/models/public-tool';
import { HttpClient } from './http/client';
import { getToolsRequestRequest } from './services/tools/models/get-tools-request';
import { getToolsRequestGetToolsPostOkResponseResponse } from './services/tools/models/get-tools-request-get-tools-post-ok-response';
import { runToolsRequestRequest } from './services/tools/models/run-tools-request';
import { runToolsResponseResponse } from './services/tools/models/run-tools-response';
import * as dotenv from 'dotenv';

export * from './services/tools';
export type * from './http';

dotenv.config();

const defaultApiKey = process.env.TOOLHOUSE_API_KEY

if (defaultApiKey === undefined) {
  console.log('defaultApiKey', defaultApiKey)
  console.error('Invalid configuration, check your Enviromnent variables')
  process.exit(0)
}

export default class Toolhouse {
  private _client: HttpClient;
  private _provider: ProviderTypes;
  private _metadata: MetadataType;

  constructor(public config: SdkConfig) {
    const baseUrl = config.environment || config.baseUrl || Environment.DEFAULT;
    this.config = {
      ...config,
      baseUrl,
    };
    this._client = new HttpClient(this.config);
    this._provider = config.provider ?? 'openai'
    this.apiKey = config.apiKey ?? defaultApiKey!
    this._metadata = config.metadata ?? {}
  }

  /**
 * This endpoint retrieves a list of public tools available on Toolhouse.
 * @returns {Promise<HttpResponse<PublicTool[]>>} Successful Response
 */
  async tools(requestConfig?: RequestConfig): Promise<HttpResponse<PublicTool[]>> {
    const request = new RequestBuilder<PublicTool[]>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('GET')
      .setPath('/tools')
      .setRequestSchema(z.any())
      .setResponseSchema(z.array(publicToolResponse))
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .build();

    return this.client.call<PublicTool[]>(request);
  }

  /**
* This endpoint retrieves tools from a specific provider.
* @returns {Promise<HttpResponse<GetToolsRequestGetToolsPostOkResponse>>} Successful Response
*/
  async getTools(
    bundle?: string,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<GetToolsRequestGetToolsPostOkResponse>> {
    const body: GetToolsRequest = {
      provider: this._provider,
      bundle: bundle
    }
    const request = new RequestBuilder<GetToolsRequestGetToolsPostOkResponse>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/get_tools')
      .setRequestSchema(getToolsRequestRequest)
      .setResponseSchema(getToolsRequestGetToolsPostOkResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();

    return this.client.call<GetToolsRequestGetToolsPostOkResponse>(request);
  }

  /**
   * This endpoint runs a tool based on the specified provider and content.
   * @returns {Promise<HttpResponse<RunToolsResponse>>} Successful Response
   */
  async runTools(
    body: RunToolsRequest,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<RunToolsResponse>> {
    const request = new RequestBuilder<RunToolsResponse>()
      .setBaseUrl(this.config)
      .setConfig(this.config)
      .setMethod('POST')
      .setPath('/run_tools')
      .setRequestSchema(runToolsRequestRequest)
      .setResponseSchema(runToolsResponseResponse)
      .setRequestContentType(ContentType.Json)
      .setResponseContentType(ContentType.Json)
      .setRetryAttempts(this.config, requestConfig)
      .setRetryDelayMs(this.config, requestConfig)
      .setResponseValidation(this.config, requestConfig)
      .addHeaderParam({ key: 'Content-Type', value: 'application/json' })
      .addBody(body)
      .build();

    return this.client.call<RunToolsResponse>(request);
  }

  public get client(): HttpClient {
    return this._client;
  }
  public get metadata(): MetadataType {
    return this.metadata;
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
    this.apiKey = apiKey
    this.config.apiKey = apiKey;
  }

  public set metadata(metadata: MetadataType) {
    this._metadata = { ...this._metadata, ...metadata }
  }

  public set provider(value: ProviderTypes) {
    this._provider = value;
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
