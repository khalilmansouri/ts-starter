import { Post } from "@entity/post";
import { PostService } from "@service/post";
import { HttpResponse, HttpRequest } from "@http/index"
import { Service } from "typedi";

@Service()
export class PostController {

  constructor(private readonly postService: PostService) { }

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    let post = httpRequest.body as Omit<Post, "_id">
    let inserted = await this.postService.create(post)
    let statusCode: number;
    if (inserted) {
      statusCode = 200
    } else {
      statusCode = 400
    }
    let httpResponse: HttpResponse = {
      headers: {},
      statusCode: 200,
      body: {}
    }
    return httpResponse
  }

  async find() {
    let ret = await this.postService.find({})
    let httpResponse: HttpResponse = {
      body: ret,
      statusCode: 200,
      headers: {}
    }
    return httpResponse;
  }

  async findById(httpRequest: HttpRequest) {
    const id = httpRequest.body._id
    let ret = await this.postService.findById(id)
    let httpResponse: HttpResponse = {
      body: ret,
      statusCode: 200,
      headers: {}
    }
    return httpResponse;

  }
}