import { z } from 'zod';
import { BaseService } from '../base-service';
import { ContentType, HttpResponse, RequestConfig } from '../../http/types';
import { RequestBuilder } from '../../http/transport/request-builder';
import { PublicTool, publicToolResponse } from './models/public-tool';
import { GetToolsRequest, getToolsRequestRequest } from './models/get-tools-request';
import {
  GetToolsRequestGetToolsPostOkResponse,
  getToolsRequestGetToolsPostOkResponseResponse,
} from './models/get-tools-request-get-tools-post-ok-response';
import { RunToolsRequest, runToolsRequestRequest } from './models/run-tools-request';
import { RunToolsResponse, runToolsResponseResponse } from './models/run-tools-response';

export class ToolsService extends BaseService {
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
    body: GetToolsRequest,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<GetToolsRequestGetToolsPostOkResponse>> {
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
}
