import { Action } from "routing-controllers";
import { decipher } from "@http/middleware/jwt"

export const accessControl = (action: Action, roles: string[]) => {
  let token = action.request.headers['authorization'];
  const payload = decipher(token) as { email: string, roles: string[] }
  console.log(payload)
  console.log(roles)

  if (roles.find(role => payload.roles.indexOf(role) !== -1)) return true;
  return false
}


