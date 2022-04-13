import { DTOUser } from "@kurakichi/modules";
import { User, UserRole } from "../generated/generatedTypes";

export const dtoUserToGql = (user: DTOUser): User => {
  const {
    avatar,
    belongOrgs,
    belongBases,
    description,
    email,
    id,
    image,
    messages,
    role,
    userName,
  } = user;

  const edges = messages.map((id) => {
    return { cursor: id };
  });

  const _messages = { pageInfo: { hasNext: false, hasPrevious: false }, edges };

  return {
    id,
    name: userName,
    email,
    role:
      role === "CLIENT"
        ? UserRole["Client"]
        : "EXPERT"
        ? UserRole["Expert"]
        : "VISITOR"
        ? UserRole["Visitor"]
        : undefined,
    selfIntro: description,
    avatarUrl: avatar,
    heroImageUrl: image,
    messages: _messages,
  };
};

export const dtoUsersToGql = (users: DTOUser[]): User[] => {
  return users.map((user) => dtoUserToGql(user));
};
