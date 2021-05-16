import { ImportsNotUsedAsValues } from "typescript"


export type PostQuery = {
  from?: Date,
  to?: Date,
}

// Post inteface
export type Post = {
  id: string
  title: string
  text: string
}

// export default Post

