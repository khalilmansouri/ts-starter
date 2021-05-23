import "reflect-metadata";
import { Container } from "typedi"
import { PostRepository } from "@repository/post"
import { PostService } from "@service/post";
import { PostController } from "@controller/post";



describe("IoC test", () => {

  it("Shoud load post service", async () => {
    const postService = Container.get(PostService)
    console.log(postService)
    expect(postService).toBeDefined()
    // console.log(await postService.find({}))
    // expect(postService).toBeInstanceOf(PostService)
  })

  // it("Shoud load post controller", async () => {
  //   await Container.get(PostRepository).init()
  //   const postController = Container.get(PostController)
  //   expect(postController).toBeDefined()
  //   console.log(await postController.find())
  //   expect(postController).toBeInstanceOf(PostController)
  // })
})