import { Post, PostQuery } from "@entity/post";


export interface PostRepository {
  init(): void,
  create(post: Omit<Post, "_id">): Promise<Boolean>,
  find(query: PostQuery): Promise<Post[]>,
  findById(id: string): Promise<Post>,
}

