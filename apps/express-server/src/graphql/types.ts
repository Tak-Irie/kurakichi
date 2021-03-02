import { Field, InputType, ObjectType } from 'type-graphql';

import { StoredUser } from './entities/StoredUser';

@ObjectType()
export class UserResponse {
  @Field(() => String, { nullable: true })
  message: string | null;

  @Field(() => StoredUser, { nullable: true })
  user: StoredUser | null;
}

@ObjectType()
export class Users {
  @Field(() => String, { nullable: true })
  message: string | null;

  @Field(() => [StoredUser], { nullable: true })
  users: StoredUser[] | null;
}

@InputType()
export class UserInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
