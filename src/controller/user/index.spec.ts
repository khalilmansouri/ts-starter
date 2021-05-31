import "reflect-metadata";
import { Container } from "typedi";

import { User } from "@entity/user";
import { UserRepository } from "@src/repository/user";
import { UserController } from "@controller/user/index";
import { Mongo } from "@src/dataAccess/mongodb";

describe("Post Controller", () => {
  let userController: UserController;

  beforeAll(async () => {
    await Container.get(Mongo).connect();
  });

  beforeEach(async () => {
    await Container.get(UserRepository).remove();
  });
  afterAll(async () => {
    await Container.get(UserRepository).close();
  });

  it("signup", async () => {
    userController = Container.get(UserController);
    const token = await userController.signup({
      email: "jack@berrel.com",
      password: "123"
    });
    expect(token).toBeDefined();
    // const inserted = await postController.create(p);
    // expect(inserted).toBe(true);
  });

  it("Login", async () => {
    userController = Container.get(UserController);
    let token = await userController.signup({
      email: "jack@berrel.com",
      password: "123"
    });
    expect(token).toBeDefined();

    token = await userController.login({
      email: "jack@berrel.com",
      password: "123"
    });
    expect(token).toBeDefined();
  });
});
