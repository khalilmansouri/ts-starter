import "reflect-metadata";
import { User } from "@entity/user";
import { UserRepository } from "@src/repository/user";
import { UserService } from "@service/user/index";
import { Container, Service } from "typedi";
import { Mongo } from "@src/dataAccess/mongodb";




describe("User Service", () => {

  beforeAll(async () => {
    await Container.get(Mongo).connect();
  });

  beforeEach(async () => {
    await Container.get(UserRepository).remove();
  });
  afterAll(async () => {
    await Container.get(UserRepository).close();
  });


  it("Create User", async () => {
    const userService = Container.get(UserService);
    const user: User = { email: "joe@doe.com", password: "123", createdAt: new Date(), roles: ["user"] };
    const inserted = await userService.create(user);
    expect(inserted).toEqual(true);

  });

  it("find users", async () => {
    const userService = Container.get(UserService);
    const user: User = { email: "joe@doe.com", password: "123", createdAt: new Date(), roles: ["user"] };
    const inserted = await userService.create(user);
    expect(inserted).toEqual(true);
    const users = await userService.find();
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(user.email);
  });

  it("Find user by email", async () => {
    const userService = Container.get(UserService);
    const user: User = { email: "joe@doe.com", password: "123", createdAt: new Date(), roles: ["user"] };
    const inserted = await userService.create(user);
    expect(inserted).toEqual(true);
    const foudUser = await userService.findByEmail(user.email);
    expect(foudUser).toBeDefined();
    expect(foudUser.email).toEqual(user.email);
  });

});

