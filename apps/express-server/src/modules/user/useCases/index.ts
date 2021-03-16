import { UserRepository } from '../infrastructure/UserRepository';

import { RegisterUserUseCase } from './registerUser/RegisterUserUseCase';
import { GetUsersUseCase } from './getUsers/GetUsersUseCase';
import { LoginUserUseCase } from './loginUser/LoginUserUseCase';
import { GetUserByIdUseCase } from './getUserById/GetUserByIdUseCase';
import { LogoutUserUseCase } from './logoutUser/logoutUserUseCase';
import { DeleteUserUseCase } from './deleteUser/DeleteUserUseCase';
import { SsoUserUseCase } from './ssoUser/ssoUserUseCase';
import { ForgotPasswordUseCase } from './forgotPassword/ForgotPasswordUseCase';

const userRepo = new UserRepository();

export const useGetUserById = new GetUserByIdUseCase(userRepo);
export const useRegisterUserUseCase = new RegisterUserUseCase(userRepo);
export const useGetUsersUseCase = new GetUsersUseCase(userRepo);
export const useLoginUserUseCase = new LoginUserUseCase(userRepo);
export const useLogoutUserUseCase = new LogoutUserUseCase(userRepo);
export const useDeleteUserUseCase = new DeleteUserUseCase(userRepo);
export const useSsoUserUseCase = new SsoUserUseCase(userRepo);
export const useForgotPasswordUseCase = new ForgotPasswordUseCase(userRepo);
