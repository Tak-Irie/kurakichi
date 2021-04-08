import { User } from '@kurakichi/domain';
import { IDs } from '../../types';
import { UIDsToGql } from '../../util/UIDsToGql';

export type UserDTO = {
  id: string;
  email: string;
  userName: string;
  role: 'USER' | 'PRO';
  picture: string;
  belongOrg: IDs;
  belongRoom: IDs;
  messages: IDs;
};

export const userToPresentation = (user: User): UserDTO => {
  const { id, email, userName, belongOrg, belongRoom, messages, picture, role } = user.getProps();
  let orgs: IDs;
  let rooms: IDs;
  let _messages: IDs;

  if (belongOrg) orgs = UIDsToGql(belongOrg);
  if (belongRoom) rooms = UIDsToGql(belongRoom);
  if (messages) _messages = UIDsToGql(messages);

  const data = {
    id: id.getId(),
    email: email.getValue(),
    userName: userName.getValue(),
    role,
    picture,
    belongOrg: orgs,
    belongRoom: rooms,
    messages: _messages,
  };
  return data;
};
