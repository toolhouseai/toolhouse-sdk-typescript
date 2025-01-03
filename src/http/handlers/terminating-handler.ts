import { Request } from "../transport/request";
import { HttpResponse, RequestHandler } from "../types";
import { RequestFetchAdapter } from "../transport/request-fetch-adapter";

export class TerminatingHandler implements RequestHandler {
  async handle<T>(request: Request<T>): Promise<HttpResponse<T>> {
    return handleResponse<T>(await new RequestFetchAdapter(request).send());
  }
}

function handleResponse<T>(response: HttpResponse<unknown>): HttpResponse<T> {
  return response as HttpResponse<T>;
}
