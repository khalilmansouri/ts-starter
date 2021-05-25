import { PostRepository } from "@repository/post/";
import { Post, PostQuery } from "@entity/post"
import { Service } from "typedi";
@Service()
export class PostService {

  constructor(private readonly postRepo: PostRepository) { }

  async create(post: Post): Promise<Boolean> {
    return await this.postRepo.create(post);
  }

  async find(q: PostQuery) {
    return await this.postRepo.find(q)
  }

  async findById(id: string) {
    return await this.postRepo.findById(id)
  }

  async delete() {
    return await this.postRepo.remove()
  }

}