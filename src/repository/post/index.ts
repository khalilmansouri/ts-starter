import { Post, PostQuery } from "@entity/post";

export interface IPostRepository {
  // init(): void,
  create(post: Omit<Post, "_id">): Promise<boolean>,
  find(query: PostQuery): Promise<Post[]>,
  findById(id: string): Promise<Post>,
  remove(): Promise<unknown>,
}

export { MongoRepo as PostRepository } from "@src/repository/post/monogRepo";