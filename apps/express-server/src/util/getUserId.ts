import { Context } from './context';

//TODO:
export function getUserIdByCookie(context: Context) {
  const id = context.req.session.userId;
  return id;
}
