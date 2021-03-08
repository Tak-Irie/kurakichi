import { User } from '../../modules/user/domain/User';
import { NexusGenObjects } from '../generated/nexus';

export const userToPresentation = (
  user: User,
): NexusGenObjects['UserResponse'] => {
  const data = {
    id: user.getId(),
    email: user.getEmail(),
    username: user.getUsername(),
  };
  return data;
};
