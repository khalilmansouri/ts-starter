

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
  GET(path: string, f: (req: HttpRequest, res: HttpResponse) => void): void,
  POST(path: string, f: (req: HttpRequest, res: HttpResponse) => void): void,
  PUT(path: string, f: (req: HttpRequest, res: HttpResponse) => void): void,
}

