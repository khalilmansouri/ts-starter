import { Action } from "routing-controllers";


export const accessControl = (action: Action, roles: string[]) => {
  let token = action.request.headers['authorization'];
  if (!roles.includes(token)) return false
  // TODO check the token validity and extract the user roles 
  return true
}


