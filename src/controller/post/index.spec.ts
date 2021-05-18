import { Post } from "@entity/post";
import { MongodbRepo } from "@repository/post/monogdbRepo"
import { PostService } from "@service/post/index"
import { HttpRequest } from "@http/index";
import { PostController } from "@controller/post/index"




describe("Post Controller", () => {
  let postRepo: MongodbRepo;
  let postService: PostService;
  let postController: PostController;

  beforeAll(async (done) => {
    postRepo = new MongodbRepo()
    await postRepo.init()
    done()
  });

  beforeEach(async () => {
    await postRepo.remove()
  })
  afterAll(done => {
    postRepo.close()
    done()
  })


  it("Init post Controller", () => {
    postService = new PostService(postRepo)
    postController = new PostController(postService)
    expect(postController).toBeDefined()
  })

  it("Create a post", async () => {
    let p: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }
    let httpRequest: HttpRequest = {
      body: p, query: {}, params: {}, headers: {}, method: {}, ip: {}, path: {}
    }
    let inserted = await postService.create(p);
    expect(inserted).toBe(true);

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
    let inserted = await postService.create(p);
    expect(inserted).toBe(true);

    let posts: Post[] = await postService.find({})
    expect(posts.length).toEqual(1);
    expect(posts[0].title).toEqual(p.title);

    let post: Post = await postService.findById(posts[0]._id)
    expect(post.title).toEqual(p.title);
  })

})

