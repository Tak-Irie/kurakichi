import { User } from '@kurakichi/domain';

export type UserDTO = {
  id: string;
  email: string;
  userName: string;
};

export const userToPresentation = (user: User): UserDTO => {
  const data = {
    id: user.getId(),
    email: user.getEmail(),
    userName: user.getUsername(),
  };
  return data;
};
