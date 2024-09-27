import { Hook } from './hook';
import { HttpRequest, HttpResponse } from './hook';
import { HttpError } from '../error';

export class CustomHook implements Hook {
  public async beforeRequest(request: HttpRequest, params: Map<string, string>): Promise<HttpRequest> {
    return request;
  }

  public async afterResponse(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): Promise<HttpResponse<any>> {
    return response;
  }

  public async onError(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): Promise<HttpError> {
    return new HttpError(response.metadata);
  }
}
