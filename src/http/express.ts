import express, { Request, Response } from 'express';
import { Router, HttpRequest, HttpResponse } from "@http/index"

// const router = express.Router()


// const app = express();

// app.use(express.json({ limit: "5mb" }))

// app.post('/', async (request: express.Request, response) => {
//   // let p: Post = { id: "1", title: "title1", text: "text1" }
//   // await mongodbRepo.create(p)
// });

// app.get('/', async (request: express.Request, response) => {
//   // let posts = await mongodbRepo.find({})
//   // response.send(posts);
// });

// app.listen(5000, () => { console.log("Express is UP") });

export class ExpressServer implements Router {

  private application: express.Application
  private router: express.Router

  constructor() {
    this.application = express();
    this.router = express.Router();
    this.application.use(this.router)
  }

  listen(PORT: number) {
    this.application.listen(PORT, () => {
      console.log("Server listen on port : ", PORT)
    })
  }

  handler(controllerHandler: (httpRequest: HttpRequest) => Promise<HttpResponse>) {

    return (req: Request, res: Response) => {
      let httpRequest: HttpRequest = {
        body: req.body,
        query: req.query,
        params: req.params,
        ip: req.ip,
        method: req.method,
        path: req.path,
        headers: {
          'Content-Type': req.get('Content-Type'),
          Referer: req.get('referer'),
          'User-Agent': req.get('User-Agent')
        }
      }
      controllerHandler(httpRequest)
        .then(httpResponse => {
          if (httpResponse.headers) {
            res.set(httpResponse.headers)
          }
          res.type('json')
          res.status(httpResponse.statusCode).send(httpResponse.body)
        })
        .catch(e => {
          console.error(e)
          res.status(500).send({ error: 'An unkown error occurred.' })
        })
    }
  }

  GET(path: string, f: (httpRequest: HttpRequest) => Promise<HttpResponse>) {
    this.application.get(path, this.handler(f));
  };
  // POST(path: string, f: (httpRequest: HttpRequest) => Promise<HttpResponse>) {
  //   this.application.post(path, this.handler(f));
  // };
  // PUT(path: string, f: (httpRequest: HttpRequest) => Promise<HttpResponse>) {
  //   this.application.put(path, this.handler(f));
  // };
}