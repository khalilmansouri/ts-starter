import "reflect-metadata"
import { Post } from "@entity/post";
import { PostRepository } from "@src/repository/post"
import { PostService } from "@service/post/index"
import { Container, Service } from "typedi";
import { mock } from "jest-mock-extended"
import { Mongo } from "@src/dataAccess/mongodb";




describe("Post Service", () => {
  // let postRepo: PostRepository;
  let postService: PostService;

  beforeAll(async () => {
    await Container.get(Mongo).connect()
  });

  beforeEach(async () => {
    await Container.get(PostRepository).remove()
  })
  afterAll(async () => {
    await Container.get(PostRepository).close()
  })


  it("Init post service", () => {
    // const mockedPostRepo = mock<PostRepository>();
    // mockedPostRepo.create.mockResolvedValue(true);
    // postService = new PostService(mockedPostRepo)
    postService = Container.get(PostService)
    expect(postService).toBeDefined()
  })

  it("Create a post", async () => {
    // const mockedPostRepo = mock<PostRepository>();
    // mockedPostRepo.create.mockResolvedValue(true);
    postService = Container.get(PostService)
    let p: Post = { title: "tt1", text: "txt1" }
    let inserted = await postService.create(p);
    expect(inserted).toBe(true);
  })

  it("Find a posts", async () => {
    let p1: Post = { title: "tt1", text: "txt1" }
    let p2: Post = { title: "tt2", text: "txt2" }
    let inserted = await postService.create(p1);
    expect(inserted).toBe(true);
    inserted = await postService.create(p2);
    expect(inserted).toBe(true);

    let posts: Post[] = await postService.find({})
    expect(posts.length).toEqual(2);
    expect(posts[0].title).toEqual(p1.title);
    expect(posts[1].title).toEqual(p2.title);
  })

  it("Find a post by _id", async () => {
    let p: Post = { title: "tt1", text: "txt1" }
    let inserted = await postService.create(p);
    expect(inserted).toBe(true);

    let posts: Post[] = await postService.find({})
    expect(posts.length).toEqual(1);
    expect(posts[0].title).toEqual(p.title);

    let post: Post = await postService.findById(posts[0]._id)
    expect(post.title).toEqual(p.title);
  })

})

