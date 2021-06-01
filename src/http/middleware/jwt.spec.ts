import "reflect-metadata";
import { Token, Payload } from "./jwt";

describe("Token", () => {
  it("Cipher and Decipher JWT", () => {
    const token = new Token();
    const p: Payload = { email: "some@email.com", roles: ["someRole"] };
    const jwt = token.cipher(p);

    const decipheredJwt = token.decipher(jwt);
    expect(decipheredJwt).toHaveProperty("email");
    expect(decipheredJwt.email).toEqual(p.email);
    expect(decipheredJwt.roles).toEqual(p.roles);
  });
});
