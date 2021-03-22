import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
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

export type Dialog = {
  __typename?: 'Dialog';
  id: Scalars['String'];
  text: Scalars['String'];
};

export type GeneralResponse = {
  __typename?: 'GeneralResponse';
  result?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getUsers: GetUser;
  me?: Maybe<GetUser>;
};

export type Mutation = {
  __typename?: 'Mutation';
  userRegister?: Maybe<GetUser>;
  login?: Maybe<GetUser>;
  logout?: Maybe<GeneralResponse>;
  deleteUser?: Maybe<GeneralResponse>;
  forgetPassword?: Maybe<GeneralResponse>;
  changePassword?: Maybe<GeneralResponse>;
  postDialog?: Maybe<Dialog>;
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


export type MutationChangePasswordArgs = {
  currentPass: Scalars['String'];
  newPass: Scalars['String'];
};


export type MutationPostDialogArgs = {
  id: Scalars['String'];
  text: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  dialogPosted?: Maybe<Dialog>;
};

export type DialogPostMutationVariables = Exact<{
  postDialogId: Scalars['String'];
  postDialogText: Scalars['String'];
}>;


export type DialogPostMutation = (
  { __typename?: 'Mutation' }
  & { postDialog?: Maybe<(
    { __typename?: 'Dialog' }
    & Pick<Dialog, 'id' | 'text'>
  )> }
);

export type UserChangePasswordMutationVariables = Exact<{
  CurrentPass: Scalars['String'];
  NewPass: Scalars['String'];
}>;


export type UserChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'GeneralResponse' }
    & Pick<GeneralResponse, 'result' | 'message'>
  )> }
);

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

export type SubDialogSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubDialogSubscription = (
  { __typename?: 'Subscription' }
  & { dialogPosted?: Maybe<(
    { __typename?: 'Dialog' }
    & Pick<Dialog, 'id' | 'text'>
  )> }
);


export const DialogPostDocument = gql`
    mutation DialogPost($postDialogId: String!, $postDialogText: String!) {
  postDialog(id: $postDialogId, text: $postDialogText) {
    id
    text
  }
}
    `;
export type DialogPostMutationFn = Apollo.MutationFunction<DialogPostMutation, DialogPostMutationVariables>;

/**
 * __useDialogPostMutation__
 *
 * To run a mutation, you first call `useDialogPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDialogPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dialogPostMutation, { data, loading, error }] = useDialogPostMutation({
 *   variables: {
 *      postDialogId: // value for 'postDialogId'
 *      postDialogText: // value for 'postDialogText'
 *   },
 * });
 */
export function useDialogPostMutation(baseOptions?: Apollo.MutationHookOptions<DialogPostMutation, DialogPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DialogPostMutation, DialogPostMutationVariables>(DialogPostDocument, options);
      }
export type DialogPostMutationHookResult = ReturnType<typeof useDialogPostMutation>;
export type DialogPostMutationResult = Apollo.MutationResult<DialogPostMutation>;
export type DialogPostMutationOptions = Apollo.BaseMutationOptions<DialogPostMutation, DialogPostMutationVariables>;
export const UserChangePasswordDocument = gql`
    mutation UserChangePassword($CurrentPass: String!, $NewPass: String!) {
  changePassword(currentPass: $CurrentPass, newPass: $NewPass) {
    result
    message
  }
}
    `;
export type UserChangePasswordMutationFn = Apollo.MutationFunction<UserChangePasswordMutation, UserChangePasswordMutationVariables>;

/**
 * __useUserChangePasswordMutation__
 *
 * To run a mutation, you first call `useUserChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userChangePasswordMutation, { data, loading, error }] = useUserChangePasswordMutation({
 *   variables: {
 *      CurrentPass: // value for 'CurrentPass'
 *      NewPass: // value for 'NewPass'
 *   },
 * });
 */
export function useUserChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UserChangePasswordMutation, UserChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserChangePasswordMutation, UserChangePasswordMutationVariables>(UserChangePasswordDocument, options);
      }
export type UserChangePasswordMutationHookResult = ReturnType<typeof useUserChangePasswordMutation>;
export type UserChangePasswordMutationResult = Apollo.MutationResult<UserChangePasswordMutation>;
export type UserChangePasswordMutationOptions = Apollo.BaseMutationOptions<UserChangePasswordMutation, UserChangePasswordMutationVariables>;
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserDeleteMutation, UserDeleteMutationVariables>(UserDeleteDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserForgetPasswordMutation, UserForgetPasswordMutationVariables>(UserForgetPasswordDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLoginMutation, UserLoginMutationVariables>(UserLoginDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserLogoutMutation, UserLogoutMutationVariables>(UserLogoutDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UserRegisterMutation, UserRegisterMutationVariables>(UserRegisterDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGetQuery, UserGetQueryVariables>(UserGetDocument, options);
      }
export function useUserGetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGetQuery, UserGetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGetQuery, UserGetQueryVariables>(UserGetDocument, options);
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserMeQuery, UserMeQueryVariables>(UserMeDocument, options);
      }
export function useUserMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserMeQuery, UserMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserMeQuery, UserMeQueryVariables>(UserMeDocument, options);
        }
export type UserMeQueryHookResult = ReturnType<typeof useUserMeQuery>;
export type UserMeLazyQueryHookResult = ReturnType<typeof useUserMeLazyQuery>;
export type UserMeQueryResult = Apollo.QueryResult<UserMeQuery, UserMeQueryVariables>;
export const SubDialogDocument = gql`
    subscription subDialog {
  dialogPosted {
    id
    text
  }
}
    `;

/**
 * __useSubDialogSubscription__
 *
 * To run a query within a React component, call `useSubDialogSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubDialogSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubDialogSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubDialogSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubDialogSubscription, SubDialogSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubDialogSubscription, SubDialogSubscriptionVariables>(SubDialogDocument, options);
      }
export type SubDialogSubscriptionHookResult = ReturnType<typeof useSubDialogSubscription>;
export type SubDialogSubscriptionResult = Apollo.SubscriptionResult<SubDialogSubscription>;