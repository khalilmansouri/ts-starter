import { Post, PostQuery } from "@entity/post";


export interface PostRepository {
  create(post: Post): Promise<Boolean>,
  find(query: PostQuery): Promise<Post[]>,
  findById(id: string): Promise<Post>,
}

