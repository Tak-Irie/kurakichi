/* eslint-disable no-constant-condition */
import { DTOUser, UserRoleModel } from '@kurakichi/domain';
import { UserReadModel } from '@kurakichi/domain/src/user/tempRead/UserReadModel';
import {
  MessageConnection,
  MessageEdges,
  User,
} from '../generated/generatedTypes';

export const dtoUserToGql = (user: DTOUser): User => {
  const {
    avatarUrl,
    belongOrgs,
    belongBases,
    selfIntro,
    email,
    id,
    heroImageUrl,
    messages,
    role,
    userName,
  } = user;

  const edges = messages.map((id) => {
    return { cursor: id, node: { id } };
  });

  const _messages = { pageInfo: { hasNext: false, hasPrevious: false }, edges };

  return {
    __typename: 'User',
    id,
    name: userName,
    email,
    role: role,
    selfIntro,
    avatarUrl,
    heroImageUrl,
    messages: _messages,
  };
};

export const dtoUsersToGql = (users: DTOUser[]): User[] => {
  return users.map((user) => dtoUserToGql(user));
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
    sentMessages,
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
        status: status,
        ...rest,
      },
    };
  });

  const _messages: MessageConnection = {
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
    messages: _messages,
  };
};

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
