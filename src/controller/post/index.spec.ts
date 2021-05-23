import "reflect-metadata"
import { Post } from "@entity/post";
import { MongodbRepo } from "@repository/post/monogdbRepo"
import { HttpRequest } from "@http/index";
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
    let httpRequest: HttpRequest = {
      body: p, query: {}, params: {}, headers: {}, method: {}, ip: {}, path: {}
    }
    let httpResponse = await postController.create(httpRequest);
    expect(httpResponse.statusCode).toBe(200);

  })

  it("Find a posts", async () => {
    let p1: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }
    let httpRequest1: HttpRequest = {
      body: p1, query: {}, params: {}, headers: {}, method: {}, ip: {}, path: {}
    }
    let p2: Omit<Post, "_id"> = { title: "tt2", text: "txt2" }
    let httpRequest2: HttpRequest = {
      body: p2, query: {}, params: {}, headers: {}, method: {}, ip: {}, path: {}
    }
    let httpResponse = await postController.create(httpRequest1);
    expect(httpResponse.statusCode).toBe(200);

    httpResponse = await postController.create(httpRequest2);
    expect(httpResponse.statusCode).toBe(200);

    httpResponse = await postController.find()
    expect(httpResponse.body.length).toEqual(2);
    expect(httpResponse.body[0].title).toEqual(p1.title);
    expect(httpResponse.body[1].title).toEqual(p2.title);
  })

  it("Find a post by _id", async () => {
    let p: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }
    let httpRequest: HttpRequest = {
      body: p, query: {}, params: {}, headers: {}, method: {}, ip: {}, path: {}
    }

    await postController.create(httpRequest);

    let httpResponse = await postController.find()

    let posts: Post[] = httpResponse.body
    expect(posts.length).toEqual(1);
    expect(posts[0].title).toEqual(p.title);

    httpRequest = {
      body: { _id: posts[0]._id }, query: {}, params: {}, headers: {}, method: {}, ip: {}, path: {}
    }
    httpResponse = await postController.findById(httpRequest)
    expect(httpResponse.body.title).toEqual(p.title);
  })

})

