import { UserRepository } from '../infrastructure/UserRepository';
import {} from './getUserById/GetUserByIdUseCase';

import { GetUsersUseCase } from './getUsers/GetUsersUseCase';

const userRepo = new UserRepository();

export const useGetUsersUseCase = new GetUsersUseCase(userRepo);
