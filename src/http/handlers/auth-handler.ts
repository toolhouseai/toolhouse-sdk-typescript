import { Request } from '../transport/request';
import { HttpResponse, RequestHandler } from '../types';
import { SerializationStyle } from '../serialization/base-serializer';

export class AuthHandler implements RequestHandler {
  next?: RequestHandler;

  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    const requestWithAuth = this.addAccessTokenHeader(request);

    if (!this.next) {
      throw new Error(`No next handler set in ${AuthHandler.name}`);
    }

    return this.next?.handle(requestWithAuth);
  }

  private addAccessTokenHeader<T>(request: Request<T>): Request<T> {
    const { apiKey } = request.config;
    if (!apiKey) {
      return request;
    }

    request.addHeaderParam('Authorization', {
      key: 'Authorization',
      value: `Bearer ${apiKey}`,
      explode: false,
      encode: false,
      style: SerializationStyle.SIMPLE,
      isLimit: false,
      isOffset: false,
    });

    return request;
  }
}
