import "reflect-metadata";
import { Container } from "typedi";

import { Post } from "@entity/post";
import { PostRepository } from "@src/repository/post";
import { PostController } from "@controller/post/index";
import { Mongo } from "@src/dataAccess/mongodb";





describe("Post Controller", () => {

  let postController: PostController;

  beforeAll(async () => {
    await Container.get(Mongo).connect()
  });

  beforeEach(async () => {
    await Container.get(PostRepository).remove()
  })
  afterAll(async () => {
    await Container.get(PostRepository).close()
  })


  it("Init post Controller", () => {
    postController = Container.get(PostController)
    expect(postController).toBeDefined()
  })

  it("Create a post", async () => {
    let p: Post = { title: "tt1", text: "txt1" }
    let inserted = await postController.create(p);
    expect(inserted).toBe(true);

  })

  it("Find a posts", async () => {
    let p1: Post = { title: "tt1", text: "txt1" }
    let p2: Post = { title: "tt2", text: "txt2" }
    let inserted = await postController.create(p1);
    expect(inserted).toBe(true);

    inserted = await postController.create(p2);
    expect(inserted).toBe(true);

    let posts = await postController.find(1)
    expect(posts.length).toEqual(2);

    expect(posts[0].title).toEqual(p1.title);
    expect(posts[0].text).toEqual(p1.text);

    expect(posts[1].title).toEqual(p2.title);
    expect(posts[1].text).toEqual(p2.text);
  })

  it("Find a post by _id", async () => {
    let p: Post = { title: "tt1", text: "txt1" }

    await postController.create(p);

    let posts = await postController.find(1)

    expect(posts.length).toEqual(1);
    expect(posts[0].title).toEqual(p.title);

    let post = await postController.findById(posts[0]._id)
    expect(post.title).toEqual(p.title);
  })

})

