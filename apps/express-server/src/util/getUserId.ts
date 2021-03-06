import { Context } from './context';

//TODO
export function getUserId(context: Context) {
  const cookie = context.req.cookie;
  return cookie;
}
