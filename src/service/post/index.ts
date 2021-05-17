import { PostRepository } from "@src/repository/post";
import { Post, PostQuery } from "@entity/post"

export class PostService {
  private postRepo: PostRepository;

  constructor(postRepo: PostRepository) {
    this.postRepo = postRepo
  }

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