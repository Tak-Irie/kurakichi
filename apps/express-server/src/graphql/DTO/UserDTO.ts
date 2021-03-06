import { User } from '../../modules/user/domain/User';
import { NexusGenObjects } from '../generated/nexus';

export const userToPresentation = (
  user: User,
): NexusGenObjects['UserResponse'] => {
  const data = {
    id: user.id.getId(),
    email: user.email,
    username: user.username,
  };
  return data;
};
