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
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class TestResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

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
    console.log(':', result);
    return { tests: result };
  }

  @Mutation(() => TestResponse)
  async register(@Arg('options') options: TestInput): Promise<TestResponse> {
    const result = await DbTest.create({
      id: ulid(),
      name: options.name,
    }).save();

    return { test: result };
  }
}

// import {
//   Arg,
//   // Ctx,
//   Field,
//   InputType,
//   Mutation,
//   ObjectType,
//   Query,
//   Resolver,
// } from 'type-graphql';
// // import { MyContext } from '../../types';
// import { InjectRepository } from 'typeorm-typedi-extensions';
// import { DbTest } from '../entities/DbTest';
// import { TypeOrmTestRepository } from '../../modules/example/infra/DbTestRepository';

// @ObjectType()
// export class TestResponse {
//   @Field(() => String, { nullable: true })
//   hello: string | null;

//   @Field(() => DbTest, { nullable: true })
//   test: DbTest | null;
// }

// @InputType()
// export class TestInput {
//   @Field()
//   name: string;
// }

// @Resolver(DbTest)
// export class TestResolver {
//   constructor(
//     @InjectRepository()
//     private readonly OrmUserRepository: TypeOrmTestRepository
//   ) {}
//   @Query(() => TestResponse, { nullable: true })
//   authHello(): // @Ctx(){ kauth }: MyContext
//   TestResponse | null {
//     const hello = null;
//     console.log(':');

//     return hello;
//   }

//   // @Authorized("DEVELOPER")
//   @Mutation(() => TestResponse)
//   async registerTest(
//     @Arg('options') options: TestInput
//   ): Promise<TestResponse> {
//     const result = await TypeOrmTestRepository.return;
//   }
// }
