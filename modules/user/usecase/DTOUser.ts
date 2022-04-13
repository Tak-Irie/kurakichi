import { User } from "../domain";

export type DTOUser = {
  id: string;
  email: string;
  userName: string;
  avatar: string;
  description: string;
  image: string;
  role: "VISITOR" | "EXPERT" | "CLIENT";
  messages: string[];
  belongOrgs: string[];
  belongBases: string[];
};

export const createDTOUserFromDomain = (user: User): DTOUser => {
  const {
    id,
    email,
    userName,
    avatar,
    belongOrgs,
    belongBases,
    description,
    image,
    messages,
    role,
  } = user.getProps();
  return {
    id: id.getId(),
    email: email.getValue(),
    userName: userName.getValue(),
    description: description,
    avatar: avatar,
    image: image,
    role: role,
    messages: messages.map((message) => message.getId()),
    belongOrgs: belongOrgs.map((org) => org.getId()),
    belongBases: belongBases.map((base) => base.getId()),
  };
};

export const createDTOUserArrayFromDomain = (users: User[]): DTOUser[] => {
  return users.map((user) => createDTOUserFromDomain(user));
};
