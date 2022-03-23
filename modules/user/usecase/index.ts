import { MongoUserRepository } from "../repositories/MongoUserRepository";

import { RegisterUserUseCase } from "./RegisterUser/registerUserUsecase";
import { GetUsersUseCase } from "./GetUsers/GetUserUsecase";

// export const useRegisterUserUseCase = new RegisterUserUseCase(userRepo);
// export const useGetUsersUseCase = new GetUsersUseCase(userRepo);

export * from "./DTOUser";
