import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { IUserRepository, User, UserEmail, UserPassword } from '../domain';
import { createMockValidUser } from './userTestHelper.spec';

export const MockUserRepo = jest.fn<IUserRepository, []>().mockImplementation(() => ({
  confirmExistence: async (userEmail: UserEmail): Promise<boolean> => {
    if (userEmail.props.email === 'dupulicate@test.com') return true;
    await Promise.resolve('nothing');

    return false;
  },
  getUserByUserId: async (userId: UniqueEntityId): Promise<User | undefined> => {
    const user = await createMockValidUser();
    if (userId.getId() === '1') return user;

    return undefined;
  },
  registerUser: async (user: User): Promise<User | undefined> => {
    const mockUser = await createMockValidUser();

    return mockUser;
  },
  getUsers: async (): Promise<User[] | undefined> => {
    const mockUser = await createMockValidUser();
    return [mockUser, mockUser];
  },

  getUserByEmail: async (userEmail: UserEmail): Promise<User | undefined> => {
    const mockUser = await createMockValidUser();

    if (userEmail.getValue() === 'success@email.com') return mockUser;
    return undefined;
  },

  deleteUser: async (userId: UniqueEntityId): Promise<boolean> => {
    if (userId.getId() === '1234567890') return true;
    return false;
  },
  changeUserPassword: async (userId: UniqueEntityId, password: UserPassword): Promise<boolean> => {
    if (userId.getId() === '12345678890' && password.getValue() === 'password') return true;
    return false;
  },
}));
