import {
  Resolver,
  Mutation,
  Arg,
  Field,
  ObjectType,
  Query,
  InputType,
} from 'type-graphql';
import { StoredTest } from '../entities/StoredTest';
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

  @Field(() => [StoredTest], { nullable: true })
  tests?: StoredTest[];

  @Field(() => StoredTest, { nullable: true })
  test?: StoredTest;
}

@InputType()
export class TestInput {
  @Field()
  name: string;
}

@Resolver(StoredTest)
export class TestResolver {
  @Query(() => TestResponse)
  async getTests() {
    const result = await StoredTest.find();
    return { tests: result };
  }

  @Mutation(() => TestResponse)
  async register(@Arg('name') name: string): Promise<TestResponse> {
    console.log('got access:');
    const result = await StoredTest.create({
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
