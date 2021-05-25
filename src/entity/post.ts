import { MaxLength, MinLength } from "class-validator"

// post Query
export type PostQuery = {
  title?: string,
  text?: string,
  from?: Date,
  to?: Date,
}

// Post type
export class Post {

  _id: string

  @MaxLength(10)
  title: string

  @MinLength(10)
  text: string

  constructor({ title, text }: { title: string, text: string }) {
    this.title = text;
    this.title = title;
  }
}


