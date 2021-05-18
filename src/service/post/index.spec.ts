import { Post } from "@entity/post";
import { MongodbRepo } from "@repository/post/monogdbRepo"
import { PostService } from "@service/post/index"



describe("Post Service", () => {
  let postRepo: MongodbRepo;
  let postService: PostService;

  beforeAll(async (done) => {
    postRepo = new MongodbRepo()
    await postRepo.init()
    done()
  });

  beforeEach(async () => {
    await postRepo.remove()
  })
  afterAll(async () => {
    await postRepo.close()
    // done()
  })


  it("Init post service", () => {
    postService = new PostService(postRepo)
    expect(postRepo).toBeDefined()
  })

  it("Create a post", async () => {
    let p: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }
    let inserted = await postService.create(p);
    expect(inserted).toBe(true);

  })

  it("Find a posts", async () => {
    let p1: Omit<Post, "_id"> = { title: "tt1", text: "txt1" }
    let p2: Omit<Post, "_id"> = { title: "tt2", text: "txt2" }
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

