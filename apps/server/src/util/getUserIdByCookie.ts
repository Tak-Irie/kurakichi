import { MyContext } from '../@types/global';

const getUserIdByCookie = ({ req }: MyContext): string | undefined => {
  console.log('req.session:', req.session);
  const id = req.session.userId;
  if (id === undefined) return undefined;

  return id;
};

export { getUserIdByCookie };
