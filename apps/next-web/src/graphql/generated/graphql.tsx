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
  password?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  id: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type GetUser = {
  __typename?: 'getUser';
  message: Scalars['String'];
  user?: Maybe<UserResponse>;
  users?: Maybe<Array<Maybe<UserResponse>>>;
};

export type GeneralResponse = {
  __typename?: 'GeneralResponse';
  result?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getTests?: Maybe<Array<Maybe<Test>>>;
  getUsers: GetUser;
  me?: Maybe<GetUser>;
};

export type Mutation = {
  __typename?: 'Mutation';
  testRegister?: Maybe<Test>;
  userRegister?: Maybe<GetUser>;
  login?: Maybe<GetUser>;
  logout?: Maybe<GeneralResponse>;
  deleteUser?: Maybe<GeneralResponse>;
  forgetPassword?: Maybe<GeneralResponse>;
};


export type MutationTestRegisterArgs = {
  name: Scalars['String'];
};


export type MutationUserRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};

export type UserDeleteMutationVariables = Exact<{ [key: string]: never; }>;


export type UserDeleteMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser?: Maybe<(
    { __typename?: 'GeneralResponse' }
    & Pick<GeneralResponse, 'result' | 'message'>
  )> }
);

export type UserForgetPasswordMutationVariables = Exact<{
  forgetPasswordEmail: Scalars['String'];
}>;


export type UserForgetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgetPassword?: Maybe<(
    { __typename?: 'GeneralResponse' }
    & Pick<GeneralResponse, 'result' | 'message'>
  )> }
);

export type UserLoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserLoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'getUser' }
    & Pick<GetUser, 'message'>
    & { user?: Maybe<(
      { __typename?: 'UserResponse' }
      & Pick<UserResponse, 'id'>
    )> }
  )> }
);

export type UserLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type UserLogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'GeneralResponse' }
    & Pick<GeneralResponse, 'message' | 'result'>
  )> }
);

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
      & Pick<UserResponse, 'id'>
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

export type UserMeQueryVariables = Exact<{ [key: string]: never; }>;


export type UserMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'getUser' }
    & { user?: Maybe<(
      { __typename?: 'UserResponse' }
      & Pick<UserResponse, 'id' | 'username'>
    )> }
  )> }
);


export const UserDeleteDocument = gql`
    mutation UserDelete {
  deleteUser {
    result
    message
  }
}
    `;
export type UserDeleteMutationFn = Apollo.MutationFunction<UserDeleteMutation, UserDeleteMutationVariables>;

/**
 * __useUserDeleteMutation__
 *
 * To run a mutation, you first call `useUserDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userDeleteMutation, { data, loading, error }] = useUserDeleteMutation({
 *   variables: {
 *   },
 * });
 */
export function useUserDeleteMutation(baseOptions?: Apollo.MutationHookOptions<UserDeleteMutation, UserDeleteMutationVariables>) {
        return Apollo.useMutation<UserDeleteMutation, UserDeleteMutationVariables>(UserDeleteDocument, baseOptions);
      }
export type UserDeleteMutationHookResult = ReturnType<typeof useUserDeleteMutation>;
export type UserDeleteMutationResult = Apollo.MutationResult<UserDeleteMutation>;
export type UserDeleteMutationOptions = Apollo.BaseMutationOptions<UserDeleteMutation, UserDeleteMutationVariables>;
export const UserForgetPasswordDocument = gql`
    mutation UserForgetPassword($forgetPasswordEmail: String!) {
  forgetPassword(email: $forgetPasswordEmail) {
    result
    message
  }
}
    `;
export type UserForgetPasswordMutationFn = Apollo.MutationFunction<UserForgetPasswordMutation, UserForgetPasswordMutationVariables>;

/**
 * __useUserForgetPasswordMutation__
 *
 * To run a mutation, you first call `useUserForgetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserForgetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userForgetPasswordMutation, { data, loading, error }] = useUserForgetPasswordMutation({
 *   variables: {
 *      forgetPasswordEmail: // value for 'forgetPasswordEmail'
 *   },
 * });
 */
export function useUserForgetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UserForgetPasswordMutation, UserForgetPasswordMutationVariables>) {
        return Apollo.useMutation<UserForgetPasswordMutation, UserForgetPasswordMutationVariables>(UserForgetPasswordDocument, baseOptions);
      }
export type UserForgetPasswordMutationHookResult = ReturnType<typeof useUserForgetPasswordMutation>;
export type UserForgetPasswordMutationResult = Apollo.MutationResult<UserForgetPasswordMutation>;
export type UserForgetPasswordMutationOptions = Apollo.BaseMutationOptions<UserForgetPasswordMutation, UserForgetPasswordMutationVariables>;
export const UserLoginDocument = gql`
    mutation UserLogin($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    message
    user {
      id
    }
  }
}
    `;
export type UserLoginMutationFn = Apollo.MutationFunction<UserLoginMutation, UserLoginMutationVariables>;

/**
 * __useUserLoginMutation__
 *
 * To run a mutation, you first call `useUserLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLoginMutation, { data, loading, error }] = useUserLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserLoginMutation(baseOptions?: Apollo.MutationHookOptions<UserLoginMutation, UserLoginMutationVariables>) {
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, baseOptions);
      }
export type UserLoginMutationHookResult = ReturnType<typeof useUserLoginMutation>;
export type UserLoginMutationResult = Apollo.MutationResult<UserLoginMutation>;
export type UserLoginMutationOptions = Apollo.BaseMutationOptions<UserLoginMutation, UserLoginMutationVariables>;
export const UserLogoutDocument = gql`
    mutation UserLogout {
  logout {
    message
    result
  }
}
    `;
export type UserLogoutMutationFn = Apollo.MutationFunction<UserLogoutMutation, UserLogoutMutationVariables>;

/**
 * __useUserLogoutMutation__
 *
 * To run a mutation, you first call `useUserLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userLogoutMutation, { data, loading, error }] = useUserLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useUserLogoutMutation(baseOptions?: Apollo.MutationHookOptions<UserLogoutMutation, UserLogoutMutationVariables>) {
        return Apollo.useMutation<UserLogoutMutation, UserLogoutMutationVariables>(UserLogoutDocument, baseOptions);
      }
export type UserLogoutMutationHookResult = ReturnType<typeof useUserLogoutMutation>;
export type UserLogoutMutationResult = Apollo.MutationResult<UserLogoutMutation>;
export type UserLogoutMutationOptions = Apollo.BaseMutationOptions<UserLogoutMutation, UserLogoutMutationVariables>;
export const UserRegisterDocument = gql`
    mutation UserRegister($email: String!, $password: String!, $username: String!) {
  userRegister(email: $email, password: $password, username: $username) {
    user {
      id
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
export const UserMeDocument = gql`
    query UserMe {
  me {
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useUserMeQuery__
 *
 * To run a query within a React component, call `useUserMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserMeQuery(baseOptions?: Apollo.QueryHookOptions<UserMeQuery, UserMeQueryVariables>) {
        return Apollo.useQuery<UserMeQuery, UserMeQueryVariables>(UserMeDocument, baseOptions);
      }
export function useUserMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserMeQuery, UserMeQueryVariables>) {
          return Apollo.useLazyQuery<UserMeQuery, UserMeQueryVariables>(UserMeDocument, baseOptions);
        }
export type UserMeQueryHookResult = ReturnType<typeof useUserMeQuery>;
export type UserMeLazyQueryHookResult = ReturnType<typeof useUserMeLazyQuery>;
export type UserMeQueryResult = Apollo.QueryResult<UserMeQuery, UserMeQueryVariables>;