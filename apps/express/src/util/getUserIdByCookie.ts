import { Context } from './context';

type IdResponse = {
  result: boolean;
  errMessage?: string;
  id?: string;
};

export function getUserIdByCookie(context: Context): IdResponse {
  const id = context.req.session.userId;
  if (id == undefined) return { result: false, errMessage: 'ログインを確認できませんでした' };

  return { result: true, id };
}
