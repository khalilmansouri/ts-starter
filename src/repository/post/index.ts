import { Post, PostQuery } from "@entity/post";


interface UserRepository {
  find(postQuery: PostQuery): Promise<Post>,
  findById(): Promise<Post>,
}



export default UserRepository
