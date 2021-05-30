import jsonWebToken from "jsonwebtoken"

const privateKey = "some privet token"
export const cipher = (payload: { email: string, roles: string[] }) => {
  return jsonWebToken.sign(payload, privateKey, { expiresIn: "24h" }) //g: 60, "2 days", "10h", "7d" */
}

export const decipher = (token: string) => {
  return jsonWebToken.verify(token, privateKey)
}