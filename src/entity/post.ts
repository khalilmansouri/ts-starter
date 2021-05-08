

export type PostQuery = {
  from?: Date,
  to?: Date,
}


export interface Post {
  _id: string,
  title: string,
  text: string,
}

export default Post

