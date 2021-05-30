import jsonWebToken from "jsonwebtoken"

const privateKey = "some privet token"
export const singer = (payload: { email: string, roles: string[] }) => {
  return jsonWebToken.sign(payload, privateKey)
}
