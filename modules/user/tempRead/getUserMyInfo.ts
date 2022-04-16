import { UserRepository } from '../infra';

export const getUserMyInfo = (id: string) => {
  const userRepo = new UserRepository();
  const res = userRepo.getUserMyInfoTemp(id);
  return res;
};
