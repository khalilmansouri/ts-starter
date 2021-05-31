import { Post as PostEntity } from "@entity/post";
import { PostService } from "@service/post";
import { Service } from "typedi";
import {
  JsonController,
  Body,
  Get,
  Post,
  QueryParam,
  Param,
  Delete,
  Authorized,
  HttpError
} from "routing-controllers";

@JsonController("/post")
@Service()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post("/")
  async create(@Body() post: PostEntity): Promise<boolean> {
    return await this.postService.create(post);
  }

  // post/23423423/2324
  // @Authorized("user")
  @Get("/")
  async find(@QueryParam("limit") limit: number) {
    return await this.postService.find({});
  }

  @Get("/:id")
  async findById(@Param("id") id: string) {
    return await this.postService.findById(id);
  }

  @Delete("/")
  async deleteAll() {
    const ret = await this.postService.delete();
    return ret;
  }
}
