import { Request } from '../transport/request';
import { HttpResponse, RequestHandler } from '../types';
import { RequestAxiosAdapter } from '../transport/request-axios-adapter';

export class TerminatingHandler implements RequestHandler {
  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    return new RequestAxiosAdapter(request).send();
  }
}
