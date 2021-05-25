import { Post, PostQuery } from "@entity/post";

export interface IPostRepository {
  init(): void,
  create(post: Omit<Post, "_id">): Promise<Boolean>,
  find(query: PostQuery): Promise<Post[]>,
  findById(id: string): Promise<Post>,
  remove(): Promise<any>,
}

export { MongoRepo as PostRepository } from "@src/repository/post/monogRepo"