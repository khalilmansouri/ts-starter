

export type HttpRequest = {
  body: any
  query: any,
  params: any,
  ip: any,
  method: any,
  path: any,
  headers: any
}

export type HttpResponse = {
  headers: any,
  statusCode: number,
  body: any
}



export interface Router {
  GET(path: string, f: (httpRequest: HttpRequest) => Promise<HttpResponse>): void,
  // POST(path: string, f: (httpRequest: HttpRequest) => Promise<HttpResponse>): void,
  // PUT(path: string, f: (httpRequest: HttpRequest) => Promise<HttpResponse>): void,
}

