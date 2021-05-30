import "reflect-metadata"
import Container from "typedi";
import { User } from "@entity/user";
import { UserRepository } from "@repository/user"
import { Mongo } from "@src/dataAccess/mongodb"


describe("UserRepository", () => {
  let userRepo: UserRepository

  beforeAll(async () => {
    await Container.get(Mongo).connect()
  });

  beforeEach(async () => {
    await Container.get(UserRepository).remove()
  })
  afterAll(async () => {
    await Container.get(Mongo).disconnect()
  })



  it("Insert a User", async () => {
    userRepo = Container.get(UserRepository)
    let u: Omit<User, "_id"> = { firstName: "John", lastName: "doe", email: "john.doe@yopmail.com", createdAt: new Date(), password: "123", roles: ["user"] }
    let inserted = await userRepo.create(u);
    expect(inserted).toBe(true);

  })

  it("Find a user", async () => {
    let u1: Omit<User, "_id"> = { firstName: "John", lastName: "doe", email: "john.doe@yopmail.com", createdAt: new Date(), password: "123", roles: ["user"] }
    let u2: Omit<User, "_id"> = { firstName: "Lana", lastName: "Jonson", email: "Lana.jonson@yopmail.com", createdAt: new Date(), password: "123", roles: ["user"] }
    let inserted = await userRepo.create(u1);
    expect(inserted).toBe(true);
    inserted = await userRepo.create(u2);
    expect(inserted).toBe(true);

    let users: User[] = await userRepo.find()
    expect(users.length).toEqual(2);
    expect(users[0].firstName).toEqual(u1.firstName);
    expect(users[1].email).toEqual(u2.email);
  })

  it("Find a user by Email", async () => {
    let u: User = { firstName: "John", lastName: "doe", email: "john.doe@yopmail.com", createdAt: new Date(), password: "123", roles: ["user"] }

    let inserted = await userRepo.create(u);
    expect(inserted).toBe(true);

    let users: User[] = await userRepo.find()

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(u.email);

    let user: User = await userRepo.findByEmail(users[0].email)

    expect(user.email).toEqual(u.email);
  })
})

