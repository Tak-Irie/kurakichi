import { MyContext } from './context';

type IdResponse = {
  result: boolean;
  errMessage?: string;
  id?: string;
};

//TODO: return id:string or errorField:Object
export function getUserIdByCookie(context: MyContext): IdResponse {
  const id = context.req.session.userId;
  if (id == undefined) return { result: false, errMessage: 'ログインを確認できませんでした' };

  return { result: true, id };
}
