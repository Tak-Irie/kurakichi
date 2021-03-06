import { UserRepository } from '../infrastructure/UserRepository';

import { RegisterUserUseCase } from './registerUser/RegisterUserUseCase';
import { GetUsersUseCase } from './getUsers/GetUsersUseCase';
import { LoginUserUseCase } from './loginUser/LoginUserUseCase';

const userRepo = new UserRepository();

export const useRegisterUserUseCase = new RegisterUserUseCase(userRepo);
export const useGetUsersUseCase = new GetUsersUseCase(userRepo);
export const useLoginUserUseCase = new LoginUserUseCase(userRepo);
