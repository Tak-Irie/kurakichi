import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { TypeOrmUserRepository } from '../../modules/user/infrastructure/TypeOrmUserRepository';
import { GetUserByIdUseCase } from '../../modules/user/useCases/getUserById/GetUserByIdUseCase';
import { RegisterUserUseCase } from '../../modules/user/useCases/registerUser/RegisterUserUseCase';
import { GetUsersUseCase } from '../../modules/user/useCases/getUsers/GetUsersUseCase';
import { StoredUser } from '../entities/StoredUser';
import { UserInput, UserResponse, Users } from '../types';

@Resolver(StoredUser)
export class UserResolver {
  constructor(
    @InjectRepository()
    private readonly OrmUserRepository: TypeOrmUserRepository,
  ) {}

  @Query(() => UserResponse, { nullable: true })
  async userGetById(@Arg('id') id: string): Promise<UserResponse | null> {
    const getUserByIdUseCase = new GetUserByIdUseCase(this.OrmUserRepository);
    const result = await getUserByIdUseCase.execute(id);
    if (result.isLeft())
      return { message: result.value.getErrorValue(), user: null };

    return { message: 'success', user: result.value.getValue() };
  }

  @Query(() => Users, { nullable: true })
  async users(): Promise<Users | null> {
    const getUsersUseCase = new GetUsersUseCase(this.OrmUserRepository);
    const result = await getUsersUseCase.execute();
    if (result.isLeft())
      return { message: result.value.getErrorValue(), users: null };

    return { message: 'success', users: result.value.getValue().users };
  }

  @Mutation(() => UserResponse)
  async userRegister(
    @Arg('options') options: UserInput,
  ): Promise<UserResponse> {
    const registerUserUseCase = new RegisterUserUseCase(this.OrmUserRepository);
    const result = await registerUserUseCase.execute(options);
    if (result.isLeft()) {
      const response = { message: result.value.getErrorValue(), user: null };

      return response;
    }

    return { message: 'registered!', user: null };
  }
}
