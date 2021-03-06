import { Context } from './context';

//TODO
export function getUserId(context: Context) {
  const cookie = context.req.cookies;
  return cookie;
}
