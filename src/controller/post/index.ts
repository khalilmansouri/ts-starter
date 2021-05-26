import { Post as PostEntity } from "@entity/post";
import { PostService } from "@service/post";
import { Service } from "typedi";
import { JsonController, Body, Get, Post, QueryParam, Param, Delete, Req } from "routing-controllers";
import { Request } from "express";

@JsonController()
@Service()
export class PostController {

  constructor(private readonly postService: PostService) { }

  @Post("/")
  async create(@Body() post: PostEntity) {
    // console.log(post)
    // console.log(post)
    // return { sup: "there" }
    return await this.postService.create(post)
  }

  @Post("/check")
  async check(@Body() post: PostEntity) {
    // return user
    return await this.postService.create(post as PostEntity)
  }


  @Get("/")
  async find(@QueryParam("limit") limit: any) {
    return await this.postService.find({})
  }

  @Get("/:id")
  async findById(@Param("id") id: string) {
    return await this.postService.findById(id)
  }

  @Delete("/")
  async deleteAll() {
    let ret = await this.postService.delete()
    return ret;
  }
}