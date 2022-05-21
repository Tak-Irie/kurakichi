// import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
// import { IUserRepository, User, UserEmail, UserPassword } from '../domain';
// import { createMockValidUser } from './userTestHelper.spec';

// export const MockUserRepo = jest
//   .fn<IUserRepository, []>()
//   .mockImplementation(() => ({
//     confirmExistence: async (userEmail: UserEmail): Promise<boolean> => {
//       if (userEmail.props.email === 'dupulicated@example.com') return true;
//       await Promise.resolve('');

//       return false;
//     },
//     getUserByUserId: async (
//       userId: UniqueEntityId,
//     ): Promise<User | undefined> => {
//       const user = await createMockValidUser();
//       if (userId.getId() === user.getId()) return user;

//       return undefined;
//     },
//     registerUser: async (user: User): Promise<User | undefined> => {
//       const mockUser = await createMockValidUser();

//       return mockUser;
//     },
//     getUsers: async (): Promise<User[] | undefined> => {
//       const mockUser = await createMockValidUser();
//       return [mockUser, mockUser];
//     },

//     getUserByEmail: async (userEmail: UserEmail): Promise<User | undefined> => {
//       const mockUser = await createMockValidUser();

//       if (userEmail.getValue() === mockUser.getEmail()) return mockUser;
//       return undefined;
//     },

//     deleteUser: async (userId: UniqueEntityId): Promise<boolean> => {
//       if (userId.getId() === '12345678901234567890123456') return true;
//       return false;
//     },
//     changeUserPassword: async (
//       userId: UniqueEntityId,
//       password: UserPassword,
//     ): Promise<boolean> => {
//       if (
//         userId.getId() === '123456788901234567890123456' &&
//         password.getValue() === 'validPassword'
//       )
//         return true;
//       return false;
//     },
//     getUsersByOrgId: async (orgId: UniqueEntityId): Promise<false | User[]> => {
//       if (orgId.getId() === '12345678901234567890123456') {
//         const user = await createMockValidUser();
//         return [user];
//       }
//       return false;
//     },
//     updateUser: async (user: User): Promise<false | User> => {
//       const _user = await createMockValidUser();
//       _user.updateUserName(user.getUsername());
//       return _user;
//     },
//   }));
