import { IPostRepository } from "@repository/post";
import { MongodbRepo } from "@repository/post/monogdbRepo";
import { Post, PostQuery } from "@entity/post"
import { Container, Service, Inject } from "typedi";
@Service()
export class PostService {

  constructor(private readonly postRepo: MongodbRepo) { }

  async create(post: Omit<Post, "_id">): Promise<Boolean> {
    return await this.postRepo.create(post);
  }

  async find(q: PostQuery) {
    return await this.postRepo.find(q)
  }

  async findById(_id: string) {
    return await this.postRepo.findById(_id)
  }

}