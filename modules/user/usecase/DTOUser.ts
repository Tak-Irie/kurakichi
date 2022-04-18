import { User } from '../domain';

export type DTOUser = {
  id: string;
  email: string;
  userName: string;
  avatarUrl: string;
  selfIntro: string;
  heroImageUrl: string;
  role: 'VISITOR' | 'EXPERT' | 'CLIENT';
  messages: string[];
  belongOrgs: string[];
  belongBases: string[];
};

export const createDTOUserFromDomain = (user: User): DTOUser => {
  const {
    id,
    email,
    userName,
    avatarUrl,
    belongOrgs,
    belongBases,
    selfIntro,
    heroImageUrl,
    messages,
    role,
  } = user.getProps();
  return {
    id: id.getId(),
    email: email.getValue(),
    userName: userName.getValue(),
    selfIntro: selfIntro,
    avatarUrl,
    heroImageUrl: heroImageUrl,
    role: role,
    messages: messages.map((message) => message.getId()),
    belongOrgs: belongOrgs.map((org) => org.getId()),
    belongBases: belongBases.map((base) => base.getId()),
  };
};

export const createDTOUserArrayFromDomain = (users: User[]): DTOUser[] => {
  return users.map((user) => createDTOUserFromDomain(user));
};
