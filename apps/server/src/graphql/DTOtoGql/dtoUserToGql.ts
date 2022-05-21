import { DTOUser, UserRoleModel } from '@kurakichi/domain';
import { UserReadModel } from '@kurakichi/domain/src/user/tempRead/UserReadModel';
// eslint-disable-next-line import/no-cycle
import {
  MessageConnection,
  MessageEdges,
  User,
} from '../generated/generatedTypes';

export const dtoUserToGql = (user: DTOUser): User => {
  const {
    avatarUrl,
    selfIntro,
    email,
    id,
    heroImageUrl,
    messages,
    role,
    userName,
  } = user;

  const edges = messages.map((messageId) => ({
    cursor: messageId,
    node: { id: messageId },
  }));

  const modifiedMessages = {
    pageInfo: { hasNext: false, hasPrevious: false },
    edges,
  };

  return {
    __typename: 'User',
    id,
    name: userName,
    email,
    role,
    selfIntro,
    avatarUrl,
    heroImageUrl,
    messages: modifiedMessages,
  };
};

export const dtoUsersToGql = (users: DTOUser[]): User[] =>
  users.map((user) => dtoUserToGql(user));

const convertUserRole = (role: string): UserRoleModel | undefined => {
  switch (role) {
    case 'CLIENT':
      return role;
    case 'EXPERT':
      return role;
    case 'VISITOR':
      return role;
    default:
      return undefined;
  }
};

export const readUserToGql = (user: UserReadModel): User => {
  const {
    id,
    name,
    email,
    role,
    avatarUrl,
    selfIntro,
    heroImageUrl,
    receivedMessages,
  } = user;

  const edges: MessageEdges[] = receivedMessages.map((mes) => {
    const { receiverId, senderId, content, messageTreeId, status, ...rest } =
      mes;
    return {
      cursor: mes.id,
      node: {
        receiver: { id: receiverId },
        sender: { id: senderId },
        content,
        status,
        ...rest,
      },
    };
  });

  const messages: MessageConnection = {
    pageInfo: { hasNext: false, hasPrevious: false },
    edges,
  };

  return {
    __typename: 'User',
    id,
    name,
    email,
    role: convertUserRole(role),
    selfIntro,
    avatarUrl,
    heroImageUrl,
    messages,
  };
};
