import { IUserRepository } from '../../modules/user/domain/IUserRepository';
import { User } from '../../modules/user/domain/User';
import { UserEmail } from '../../modules/user/domain/UserEmail';
import { UserName } from '../../modules/user/domain/UserName';
import { UserPassword } from '../../modules/user/domain/UserPassword';
import { jest } from '@jest/globals';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';

export const validEmail = 'success@email.com';
export const invalidEmail = 'fail';
export const validPassword = 'password';
export const invalidPassword = 'p';
export const hashedValidPassword =
  '$argon2i$v=19$m=4096,t=3,p=1$6zoQ/V/6nOPil25jstUgHg$+CpC+cvfnq9N5cwsHbvSEQH4yDmo7zTcgDbZT6CYJdk';

const username = UserName.create({ username: 'validUser' }).getValue();
const email = UserEmail.create({ email: validEmail }).getValue();
const password = UserPassword.create({ password: validPassword }).getValue();
const hashedPassword = UserPassword.create({
  password: hashedValidPassword,
}).getValue();

export const mockValidUser = User.create({
  id: UniqueEntityId.create(),
  username,
  email,
  password,
}).getValue();

export const mockValidUserWithArgon2 = User.create({
  id: UniqueEntityId.create(),
  username,
  email,
  password: hashedPassword,
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
      if (userId === '1') return mockValidUser;
      await Promise.resolve('nothing');

      return undefined;
    },
    registerUser: async (user: User): Promise<User | undefined> => {
      if (typeof user === 'object') return undefined;
      await Promise.resolve('nothing');

      return mockValidUser;
    },
    getUsers: async (): Promise<User[] | undefined> => {
      await Promise.resolve('nothing');

      return [mockValidUser, mockValidUser];
    },

    getUserByEmail: async (userEmail: UserEmail): Promise<User | undefined> => {
      if (userEmail.value === 'success@email.com')
        return mockValidUserWithArgon2;
      return undefined;
    },
  }));
