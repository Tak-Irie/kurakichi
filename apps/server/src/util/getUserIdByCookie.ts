import { MyContext } from "./Context";

type NotAuthErr = {
  error: {
    message: string;
  };
};
//TODO: return id:string or errorField:Object
export function getUserIdByCookie(context: MyContext): string | NotAuthErr {
  const id = context.req.session.userId;
  if (id == undefined)
    return { error: { message: "ログインが確認できませんでした" } };

  return id;
}
