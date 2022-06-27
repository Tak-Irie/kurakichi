import { UserRepository } from '../infra';

export const getUserByIdTemp = (id: string) => {
  const userRepo = new UserRepository();
  const res = userRepo.getUserByIdTemp(id);
  return res;
};
