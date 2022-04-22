import { MessageRepo } from '../infra';

export const getMessagesByCookie = (userId: string) => {
  const messageRepo = new MessageRepo();
  const res = messageRepo.getMessagesByCookieTemp(userId);
  return res;
};
