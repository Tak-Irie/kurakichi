import { User } from "../domain";

export type DTOUser = {
  id: string;
  email: string;
  userName: string;
};

export const createDTOUserFromDomain = (user: User): DTOUser => {
  return {
    id: user.getId(),
    email: user.getEmail(),
    userName: user.getUsername(),
  };
};

export const createDTOUserArrayFromDomain = (users: User[]): DTOUser[] => {
  return users.map((user) => createDTOUserFromDomain(user));
};
