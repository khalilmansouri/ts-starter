import "reflect-metadata"
import Container from "typedi";
import { Post } from "@entity/post";
import { PostRepository } from "@repository/post"
import { Mongo } from "@src/dataAccess/mongodb"



describe("PostRepository", () => {
  let postRepo: PostRepository

  beforeAll(async () => {
    await Container.get(Mongo).connect()
  });

  beforeEach(async () => {
    await Container.get(PostRepository).remove()
  })
  afterAll(async () => {
    await Container.get(Mongo).disconnect()
  })



  it("Insert a post", async () => {
    postRepo = Container.get(PostRepository)
    let p: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }
    let inserted = await postRepo.create(p);
    expect(inserted).toBe(true);

  })

  it("Find a post", async () => {
    let p1: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }
    let p2: Omit<Post, "_id"> = { title: "tt2", text: "txt2" }
    let inserted = await postRepo.create(p1);
    expect(inserted).toBe(true);
    inserted = await postRepo.create(p2);
    expect(inserted).toBe(true);

    let posts: Post[] = await postRepo.find({})
    expect(posts.length).toEqual(2);
    expect(posts[0].title).toEqual(p1.title);
    expect(posts[1].title).toEqual(p2.title);
  })

  it("Find a post by _id", async () => {
    let p: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }
    let inserted = await postRepo.create(p);
    expect(inserted).toBe(true);

    let posts: Post[] = await postRepo.find({})
    expect(posts.length).toEqual(1);
    expect(posts[0].title).toEqual(p.title);

    let post: Post = await postRepo.findById(posts[0]._id)
    expect(post.title).toEqual(p.title);
  })

})

