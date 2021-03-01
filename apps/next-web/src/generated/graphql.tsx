import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getTests: TestResponse;
};

export type TestResponse = {
  __typename?: 'TestResponse';
  errors?: Maybe<FieldError>;
  tests?: Maybe<Array<DbTest>>;
  test?: Maybe<DbTest>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type DbTest = {
  __typename?: 'DbTest';
  id: Scalars['String'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Mutation = {
  __typename?: 'Mutation';
  register: TestResponse;
};


export type MutationRegisterArgs = {
  name: Scalars['String'];
};

export type TestRegisterMutationVariables = Exact<{
  registerName: Scalars['String'];
}>;


export type TestRegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'TestResponse' }
    & { test?: Maybe<(
      { __typename?: 'DbTest' }
      & Pick<DbTest, 'id' | 'name'>
    )> }
  ) }
);

export type TestsGetQueryVariables = Exact<{ [key: string]: never; }>;


export type TestsGetQuery = (
  { __typename?: 'Query' }
  & { getTests: (
    { __typename?: 'TestResponse' }
    & { errors?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>, tests?: Maybe<Array<(
      { __typename?: 'DbTest' }
      & Pick<DbTest, 'id' | 'name'>
    )>> }
  ) }
);


export const TestRegisterDocument = gql`
    mutation testRegister($registerName: String!) {
  register(name: $registerName) {
    test {
      id
      name
    }
  }
}
    `;
export type TestRegisterMutationFn = Apollo.MutationFunction<TestRegisterMutation, TestRegisterMutationVariables>;

/**
 * __useTestRegisterMutation__
 *
 * To run a mutation, you first call `useTestRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testRegisterMutation, { data, loading, error }] = useTestRegisterMutation({
 *   variables: {
 *      registerName: // value for 'registerName'
 *   },
 * });
 */
export function useTestRegisterMutation(baseOptions?: Apollo.MutationHookOptions<TestRegisterMutation, TestRegisterMutationVariables>) {
        return Apollo.useMutation<TestRegisterMutation, TestRegisterMutationVariables>(TestRegisterDocument, baseOptions);
      }
export type TestRegisterMutationHookResult = ReturnType<typeof useTestRegisterMutation>;
export type TestRegisterMutationResult = Apollo.MutationResult<TestRegisterMutation>;
export type TestRegisterMutationOptions = Apollo.BaseMutationOptions<TestRegisterMutation, TestRegisterMutationVariables>;
export const TestsGetDocument = gql`
    query TestsGet {
  getTests {
    errors {
      message
    }
    tests {
      id
      name
    }
  }
}
    `;

/**
 * __useTestsGetQuery__
 *
 * To run a query within a React component, call `useTestsGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestsGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestsGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestsGetQuery(baseOptions?: Apollo.QueryHookOptions<TestsGetQuery, TestsGetQueryVariables>) {
        return Apollo.useQuery<TestsGetQuery, TestsGetQueryVariables>(TestsGetDocument, baseOptions);
      }
export function useTestsGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestsGetQuery, TestsGetQueryVariables>) {
          return Apollo.useLazyQuery<TestsGetQuery, TestsGetQueryVariables>(TestsGetDocument, baseOptions);
        }
export type TestsGetQueryHookResult = ReturnType<typeof useTestsGetQuery>;
export type TestsGetLazyQueryHookResult = ReturnType<typeof useTestsGetLazyQuery>;
export type TestsGetQueryResult = Apollo.QueryResult<TestsGetQuery, TestsGetQueryVariables>;