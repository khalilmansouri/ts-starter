import "reflect-metadata"
import { Post } from "@entity/post";
import { MongodbRepo } from "@repository/post/monogdbRepo"
import { PostController } from "@controller/post/index"
import { Container } from "typedi";




describe("Post Controller", () => {
  let postRepo: MongodbRepo;
  let postController: PostController;

  beforeAll(async () => {
    await Container.get(MongodbRepo).init()
  });

  beforeEach(async () => {
    await Container.get(MongodbRepo).remove()
  })
  afterAll(async () => {
    await Container.get(MongodbRepo).close()
  })


  it("Init post Controller", () => {
    postController = Container.get(PostController)
    expect(postController).toBeDefined()
  })

  it("Create a post", async () => {
    let p: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }
    let inserted = await postController.create(p);
    expect(inserted).toBe(true);

  })

  it("Find a posts", async () => {
    let p1: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }
    let p2: Omit<Post, "_id"> = { title: "tt2", text: "txt2" }
    let inserted = await postController.create(p1);
    expect(inserted).toBe(true);

    inserted = await postController.create(p2);
    expect(inserted).toBe(true);

    let posts = await postController.find(1)
    expect(posts.length).toEqual(2);
    expect(posts[0].title).toEqual(p1.title);
    expect(posts[1].title).toEqual(p2.title);
  })

  it("Find a post by _id", async () => {
    let p: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }

    await postController.create(p);

    let posts = await postController.find(1)

    expect(posts.length).toEqual(1);
    expect(posts[0].title).toEqual(p.title);

    let post = await postController.findById(posts[0]._id)
    expect(post.title).toEqual(p.title);
  })

})

