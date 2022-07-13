import { UserRepository } from '../infra';

export const getInquiriesAndMessagesByUserIdTemp = (userId: string) => {
  const userRepo = new UserRepository();
  const res = userRepo.getInquiriesAndMessagesByUserIdTemp(userId);
  return res;
};
