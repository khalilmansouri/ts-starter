import { Post } from "@entity/post";
import { MongodbRepo } from "@repository/post/monogdbRepo"


describe("MongodbRepo", () => {
  let postRepo: MongodbRepo

  beforeAll(async (done) => {
    // let mongoClient = await mongo.getInstance().connect()
    // postRepo = new MongodbRepo(mongoClient)
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



  it("Insert a post", async () => {
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

