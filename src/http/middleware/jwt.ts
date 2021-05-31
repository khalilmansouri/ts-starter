import jsonWebToken from "jsonwebtoken";
type Payload = {
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
