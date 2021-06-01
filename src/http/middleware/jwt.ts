import { Service } from "typedi";

import jsonWebToken from "jsonwebtoken";
export type Payload = {
  email: string;
  roles: string[];
};
const privateKey = "some privet token";
export const cipher = (payload: Payload): string => {
  return jsonWebToken.sign(payload, privateKey, { expiresIn: "24h" }); //g: 60, "2 days", "10h", "7d" */
};

export const decipher = (token: string): Payload => {
  return jsonWebToken.verify(token, privateKey) as Payload;
};

@Service()
export class Token {
  private privateKey = "some privet token";

  cipher(payload: Payload) {
    return jsonWebToken.sign(payload, this.privateKey, { expiresIn: "24h" }); //g: 60, "2 days", "10h", "7d" */
  }

  decipher(token: string): Payload {
    return jsonWebToken.verify(token, privateKey) as Payload;
  }
}
