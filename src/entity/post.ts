
// post Query
export type PostQuery = {
  title?: string,
  text?: string,
  from?: Date,
  to?: Date,
}

// Post type
export type Post = {
  _id: string
  title: string
  text: string
}


