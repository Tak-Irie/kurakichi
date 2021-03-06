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
};

export type Test = {
  __typename?: 'Test';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Tests = {
  __typename?: 'Tests';
  tests?: Maybe<Array<Maybe<Test>>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  id: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type GetUser = {
  __typename?: 'getUser';
  message: Scalars['String'];
  user?: Maybe<UserResponse>;
  users?: Maybe<Array<Maybe<UserResponse>>>;
};

export type Query = {
  __typename?: 'Query';
  getTests?: Maybe<Array<Maybe<Test>>>;
  getUsers: GetUser;
  me?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<Test>;
  userRegister?: Maybe<GetUser>;
};


export type MutationRegisterArgs = {
  name: Scalars['String'];
};


export type MutationUserRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserRegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type UserRegisterMutation = (
  { __typename?: 'Mutation' }
  & { userRegister?: Maybe<(
    { __typename?: 'getUser' }
    & Pick<GetUser, 'message'>
    & { user?: Maybe<(
      { __typename?: 'UserResponse' }
      & Pick<UserResponse, 'username'>
    )> }
  )> }
);

export type UserGetQueryVariables = Exact<{ [key: string]: never; }>;


export type UserGetQuery = (
  { __typename?: 'Query' }
  & { getUsers: (
    { __typename?: 'getUser' }
    & { users?: Maybe<Array<Maybe<(
      { __typename?: 'UserResponse' }
      & Pick<UserResponse, 'id' | 'email' | 'username'>
    )>>> }
  ) }
);


export const UserRegisterDocument = gql`
    mutation UserRegister($email: String!, $password: String!, $username: String!) {
  userRegister(email: $email, password: $password, username: $username) {
    user {
      username
    }
    message
  }
}
    `;
export type UserRegisterMutationFn = Apollo.MutationFunction<UserRegisterMutation, UserRegisterMutationVariables>;

/**
 * __useUserRegisterMutation__
 *
 * To run a mutation, you first call `useUserRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userRegisterMutation, { data, loading, error }] = useUserRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserRegisterMutation(baseOptions?: Apollo.MutationHookOptions<UserRegisterMutation, UserRegisterMutationVariables>) {
        return Apollo.useMutation<UserRegisterMutation, UserRegisterMutationVariables>(UserRegisterDocument, baseOptions);
      }
export type UserRegisterMutationHookResult = ReturnType<typeof useUserRegisterMutation>;
export type UserRegisterMutationResult = Apollo.MutationResult<UserRegisterMutation>;
export type UserRegisterMutationOptions = Apollo.BaseMutationOptions<UserRegisterMutation, UserRegisterMutationVariables>;
export const UserGetDocument = gql`
    query UserGet {
  getUsers {
    users {
      id
      email
      username
    }
  }
}
    `;

/**
 * __useUserGetQuery__
 *
 * To run a query within a React component, call `useUserGetQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGetQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserGetQuery(baseOptions?: Apollo.QueryHookOptions<UserGetQuery, UserGetQueryVariables>) {
        return Apollo.useQuery<UserGetQuery, UserGetQueryVariables>(UserGetDocument, baseOptions);
      }
export function useUserGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGetQuery, UserGetQueryVariables>) {
          return Apollo.useLazyQuery<UserGetQuery, UserGetQueryVariables>(UserGetDocument, baseOptions);
        }
export type UserGetQueryHookResult = ReturnType<typeof useUserGetQuery>;
export type UserGetLazyQueryHookResult = ReturnType<typeof useUserGetLazyQuery>;
export type UserGetQueryResult = Apollo.QueryResult<UserGetQuery, UserGetQueryVariables>;