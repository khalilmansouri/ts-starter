import { Post, PostQuery } from "@entity/post";
import { MongodbRepo } from "@repository/post/monogdbRepo"

export interface IPostRepository {
  // init(): void,
  create(post: Omit<Post, "_id">): Promise<Boolean>,
  find(query: PostQuery): Promise<Post[]>,
  findById(id: string): Promise<Post>,
}

export const PostRepository = MongodbRepo