import { Action } from "routing-controllers";
import { decipher } from "@http/middleware/jwt";

export const accessControl = (action: Action, roles: string[]): boolean => {
  const token = action.request.headers["authorization"];
  const payload = decipher(token) as { email: string; roles: string[] };

  if (roles.find((role) => payload.roles.indexOf(role) !== -1)) return true;
  return false;
};
