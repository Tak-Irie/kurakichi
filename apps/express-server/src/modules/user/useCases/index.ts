import { UserRepository } from '../infrastructure/UserRepository';

import { RegisterUserUseCase } from './registerUser/RegisterUserUseCase';
import { GetUsersUseCase } from './getUsers/GetUsersUseCase';
import { LoginUserUseCase } from './loginUser/LoginUserUseCase';
import { GetUserByIdUseCase } from './getUserById/GetUserByIdUseCase';
import { LogoutUserUseCase } from './logoutUser/logoutUserUseCase';

const userRepo = new UserRepository();

export const useGetUserById = new GetUserByIdUseCase(userRepo);
export const useRegisterUserUseCase = new RegisterUserUseCase(userRepo);
export const useGetUsersUseCase = new GetUsersUseCase(userRepo);
export const useLoginUserUseCase = new LoginUserUseCase(userRepo);
export const useLogoutUserUseCase = new LogoutUserUseCase(userRepo);
