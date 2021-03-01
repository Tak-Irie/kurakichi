import {
  Resolver,
  Mutation,
  Arg,
  Field,
  ObjectType,
  Query,
  InputType,
} from 'type-graphql';
import { DbTest } from '../entities/DbTest';
import { ulid } from 'ulid';

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class TestResponse {
  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;

  @Field(() => [DbTest], { nullable: true })
  tests?: DbTest[];

  @Field(() => DbTest, { nullable: true })
  test?: DbTest;
}

@InputType()
export class TestInput {
  @Field()
  name: string;
}

@Resolver(DbTest)
export class TestResolver {
  @Query(() => TestResponse)
  async getTests() {
    const result = await DbTest.find();
    return { tests: result };
  }

  @Mutation(() => TestResponse)
  async register(@Arg('name') name: string): Promise<TestResponse> {
    console.log('got access:');
    const result = await DbTest.create({
      id: ulid(),
      name: name,
    }).save();

    if (result === null)
      return {
        errors: { field: 'some', message: 'fail!' },
      };

    return { test: result };
  }
}
