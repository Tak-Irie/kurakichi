import { IUserRepository } from '../../modules/user/domain/IUserRepository';
import { User } from '../../modules/user/domain/User';
import { UserEmail } from '../../modules/user/domain/UserEmail';
import { UserName } from '../../modules/user/domain/UserName';
import { UserPassword } from '../../modules/user/domain/UserPassword';

export const validEmail = 'success@email.com';
export const invalidEmail = 'fail';
export const validPassword = 'password';
export const invalidPassword = 'p';

const username = UserName.create({ username: 'okName' }).getValue();
const email = UserEmail.create({ email: validEmail }).getValue();
const password = UserPassword.create({ password: validPassword }).getValue();

export const dummyValidUser = User.create({
  username,
  email,
  password,
}).getValue();

export const MockUserRepository = jest
  .fn<IUserRepository, []>()
  .mockImplementation(() => ({
    confirmExistence: async (userEmail: UserEmail): Promise<boolean> => {
      if (userEmail.props.email === 'dupulicate@test.com') return true;
      await Promise.resolve('nothing');

      return false;
    },
    getUserByUserId: async (userId: string): Promise<User | undefined> => {
      if (userId === '1') return dummyValidUser;
      await Promise.resolve('nothing');

      return undefined;
    },
    registerUser: async (user: User): Promise<boolean> => {
      if (typeof user === 'object') return true;
      await Promise.resolve('nothing');

      return false;
    },
    getUsers: async (): Promise<User[] | undefined> => {
      await Promise.resolve('nothing');

      return [dummyValidUser, dummyValidUser];
    },

    getUserByEmail: async (userEmail: UserEmail): Promise<User | undefined> => {
      if (userEmail.value === 'success@email.com') return dummyValidUser;
      return undefined;
    },
  }));
