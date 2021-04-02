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

export type Dialog = Node & {
  __typename?: 'Dialog';
  /** GUID for a resource */
  id: Scalars['ID'];
  dialogContent: Scalars['String'];
};

export type DialogPayload = {
  __typename?: 'DialogPayload';
  dialog?: Maybe<Array<Maybe<Dialog>>>;
  error?: Maybe<RegularError>;
};

export type Message = Node & {
  __typename?: 'Message';
  /** GUID for a resource */
  id: Scalars['ID'];
  content: Scalars['String'];
};

export type MessagePayload = {
  __typename?: 'MessagePayload';
  message?: Maybe<Message>;
  messages?: Maybe<Array<Maybe<Message>>>;
  error?: Maybe<RegularError>;
};

export type Mutation = {
  __typename?: 'Mutation';
  userRegister?: Maybe<UserPayload>;
  login?: Maybe<UserPayload>;
  logout?: Maybe<RegularPayload>;
  deleteUser?: Maybe<RegularPayload>;
  forgetPassword?: Maybe<RegularPayload>;
  changePassword?: Maybe<RegularPayload>;
  postDialog?: Maybe<DialogPayload>;
  registerOrg?: Maybe<RegularPayload>;
  joinOrg?: Maybe<RegularPayload>;
  senMessage?: Maybe<MessagePayload>;
};


export type MutationUserRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
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
  dialogContent: Scalars['String'];
};


export type MutationRegisterOrgArgs = {
  name: Scalars['String'];
  location: Scalars['String'];
};


export type MutationJoinOrgArgs = {
  orgId: Scalars['String'];
};


export type MutationSenMessageArgs = {
  textInput: Scalars['String'];
  receiverId: Scalars['String'];
};

/** Identifier */
export type Node = {
  /** GUID for a resource */
  id: Scalars['ID'];
};

export type Org = Node & {
  __typename?: 'Org';
  /** GUID for a resource */
  id: Scalars['ID'];
  orgName: Scalars['String'];
  location: Scalars['String'];
  members?: Maybe<Array<Maybe<User>>>;
};

export type OrgPayload = {
  __typename?: 'OrgPayload';
  org?: Maybe<Org>;
  orgs?: Maybe<Array<Maybe<Org>>>;
  error?: Maybe<RegularError>;
};

export type Query = {
  __typename?: 'Query';
  getUsers: UserPayload;
  me?: Maybe<UserPayload>;
  getOrgs?: Maybe<OrgPayload>;
  getOrg?: Maybe<OrgPayload>;
  getMessages?: Maybe<MessagePayload>;
};


export type QueryGetOrgArgs = {
  orgId: Scalars['String'];
};

/** Generally Used as Error at business logic */
export type RegularError = {
  __typename?: 'RegularError';
  message: Scalars['String'];
  invalidField?: Maybe<Array<Scalars['String']>>;
};

export type RegularPayload = {
  __typename?: 'RegularPayload';
  result?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  dialogPosted?: Maybe<Dialog>;
};

export type User = Node & {
  __typename?: 'User';
  /** GUID for a resource */
  id: Scalars['ID'];
  email: Scalars['String'];
  userName?: Maybe<Scalars['String']>;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  error?: Maybe<RegularError>;
};

export type DialogPayloadFragment = (
  { __typename?: 'Dialog' }
  & Pick<Dialog, 'id' | 'dialogContent'>
);

export type MessagePayloadFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'content'>
);

export type OrgPayloadFragment = (
  { __typename?: 'Org' }
  & Pick<Org, 'id' | 'orgName' | 'location'>
  & { members?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'userName'>
  )>>> }
);

export type RegularErrorFragment = (
  { __typename?: 'RegularError' }
  & Pick<RegularError, 'message' | 'invalidField'>
);

export type UserPayloadFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'userName'>
);

export type JoinOrgMutationVariables = Exact<{
  OrgId: Scalars['String'];
}>;


export type JoinOrgMutation = (
  { __typename?: 'Mutation' }
  & { joinOrg?: Maybe<(
    { __typename?: 'RegularPayload' }
    & Pick<RegularPayload, 'result' | 'message'>
  )> }
);

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'UserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserPayloadFragment
    )> }
  )> }
);

export type OrgRegisterMutationVariables = Exact<{
  registerOrgName: Scalars['String'];
  registerOrgLocation: Scalars['String'];
}>;


export type OrgRegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerOrg?: Maybe<(
    { __typename?: 'RegularPayload' }
    & Pick<RegularPayload, 'result' | 'message'>
  )> }
);

export type PostDialogMutationVariables = Exact<{
  DialogId: Scalars['String'];
  DialogContent: Scalars['String'];
}>;


export type PostDialogMutation = (
  { __typename?: 'Mutation' }
  & { postDialog?: Maybe<(
    { __typename?: 'DialogPayload' }
    & { dialog?: Maybe<Array<Maybe<(
      { __typename?: 'Dialog' }
      & DialogPayloadFragment
    )>>>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { userRegister?: Maybe<(
    { __typename?: 'UserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserPayloadFragment
    )>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type SendMessageMutationVariables = Exact<{
  TextInput: Scalars['String'];
  ReceiverId: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { senMessage?: Maybe<(
    { __typename?: 'MessagePayload' }
    & { message?: Maybe<(
      { __typename?: 'Message' }
      & MessagePayloadFragment
    )>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type UserChangePasswordMutationVariables = Exact<{
  CurrentPass: Scalars['String'];
  NewPass: Scalars['String'];
}>;


export type UserChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'RegularPayload' }
    & Pick<RegularPayload, 'result' | 'message'>
  )> }
);

export type UserDeleteMutationVariables = Exact<{ [key: string]: never; }>;


export type UserDeleteMutation = (
  { __typename?: 'Mutation' }
  & { deleteUser?: Maybe<(
    { __typename?: 'RegularPayload' }
    & Pick<RegularPayload, 'result' | 'message'>
  )> }
);

export type UserForgetPasswordMutationVariables = Exact<{
  forgetPasswordEmail: Scalars['String'];
}>;


export type UserForgetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgetPassword?: Maybe<(
    { __typename?: 'RegularPayload' }
    & Pick<RegularPayload, 'result' | 'message'>
  )> }
);

export type UserLogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type UserLogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'RegularPayload' }
    & Pick<RegularPayload, 'message' | 'result'>
  )> }
);

export type GetMessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMessagesQuery = (
  { __typename?: 'Query' }
  & { getMessages?: Maybe<(
    { __typename?: 'MessagePayload' }
    & { messages?: Maybe<Array<Maybe<(
      { __typename?: 'Message' }
      & MessagePayloadFragment
    )>>>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type GetOrgQueryVariables = Exact<{
  OrgId: Scalars['String'];
}>;


export type GetOrgQuery = (
  { __typename?: 'Query' }
  & { getOrg?: Maybe<(
    { __typename?: 'OrgPayload' }
    & { org?: Maybe<(
      { __typename?: 'Org' }
      & OrgPayloadFragment
    )>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type GetOrgsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrgsQuery = (
  { __typename?: 'Query' }
  & { getOrgs?: Maybe<(
    { __typename?: 'OrgPayload' }
    & { orgs?: Maybe<Array<Maybe<(
      { __typename?: 'Org' }
      & Pick<Org, 'id' | 'orgName' | 'location'>
    )>>>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers: (
    { __typename?: 'UserPayload' }
    & { users?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & UserPayloadFragment
    )>>>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  ) }
);

export type MeUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MeUserQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserPayloadFragment
    )>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type SubscriptDialogSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscriptDialogSubscription = (
  { __typename?: 'Subscription' }
  & { dialogPosted?: Maybe<(
    { __typename?: 'Dialog' }
    & DialogPayloadFragment
  )> }
);

export const DialogPayloadFragmentDoc = gql`
    fragment DialogPayload on Dialog {
  id
  dialogContent
}
    `;
export const MessagePayloadFragmentDoc = gql`
    fragment MessagePayload on Message {
  id
  content
}
    `;
export const OrgPayloadFragmentDoc = gql`
    fragment OrgPayload on Org {
  id
  orgName
  location
  members {
    id
    userName
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on RegularError {
  message
  invalidField
}
    `;
export const UserPayloadFragmentDoc = gql`
    fragment UserPayload on User {
  id
  userName
}
    `;
export const JoinOrgDocument = gql`
    mutation JoinOrg($OrgId: String!) {
  joinOrg(orgId: $OrgId) {
    result
    message
  }
}
    `;
export type JoinOrgMutationFn = Apollo.MutationFunction<JoinOrgMutation, JoinOrgMutationVariables>;

/**
 * __useJoinOrgMutation__
 *
 * To run a mutation, you first call `useJoinOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinOrgMutation, { data, loading, error }] = useJoinOrgMutation({
 *   variables: {
 *      OrgId: // value for 'OrgId'
 *   },
 * });
 */
export function useJoinOrgMutation(baseOptions?: Apollo.MutationHookOptions<JoinOrgMutation, JoinOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinOrgMutation, JoinOrgMutationVariables>(JoinOrgDocument, options);
      }
export type JoinOrgMutationHookResult = ReturnType<typeof useJoinOrgMutation>;
export type JoinOrgMutationResult = Apollo.MutationResult<JoinOrgMutation>;
export type JoinOrgMutationOptions = Apollo.BaseMutationOptions<JoinOrgMutation, JoinOrgMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      ...UserPayload
    }
  }
}
    ${UserPayloadFragmentDoc}`;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const OrgRegisterDocument = gql`
    mutation OrgRegister($registerOrgName: String!, $registerOrgLocation: String!) {
  registerOrg(name: $registerOrgName, location: $registerOrgLocation) {
    result
    message
  }
}
    `;
export type OrgRegisterMutationFn = Apollo.MutationFunction<OrgRegisterMutation, OrgRegisterMutationVariables>;

/**
 * __useOrgRegisterMutation__
 *
 * To run a mutation, you first call `useOrgRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrgRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orgRegisterMutation, { data, loading, error }] = useOrgRegisterMutation({
 *   variables: {
 *      registerOrgName: // value for 'registerOrgName'
 *      registerOrgLocation: // value for 'registerOrgLocation'
 *   },
 * });
 */
export function useOrgRegisterMutation(baseOptions?: Apollo.MutationHookOptions<OrgRegisterMutation, OrgRegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrgRegisterMutation, OrgRegisterMutationVariables>(OrgRegisterDocument, options);
      }
export type OrgRegisterMutationHookResult = ReturnType<typeof useOrgRegisterMutation>;
export type OrgRegisterMutationResult = Apollo.MutationResult<OrgRegisterMutation>;
export type OrgRegisterMutationOptions = Apollo.BaseMutationOptions<OrgRegisterMutation, OrgRegisterMutationVariables>;
export const PostDialogDocument = gql`
    mutation PostDialog($DialogId: String!, $DialogContent: String!) {
  postDialog(id: $DialogId, dialogContent: $DialogContent) {
    dialog {
      ...DialogPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${DialogPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;
export type PostDialogMutationFn = Apollo.MutationFunction<PostDialogMutation, PostDialogMutationVariables>;

/**
 * __usePostDialogMutation__
 *
 * To run a mutation, you first call `usePostDialogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostDialogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postDialogMutation, { data, loading, error }] = usePostDialogMutation({
 *   variables: {
 *      DialogId: // value for 'DialogId'
 *      DialogContent: // value for 'DialogContent'
 *   },
 * });
 */
export function usePostDialogMutation(baseOptions?: Apollo.MutationHookOptions<PostDialogMutation, PostDialogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostDialogMutation, PostDialogMutationVariables>(PostDialogDocument, options);
      }
export type PostDialogMutationHookResult = ReturnType<typeof usePostDialogMutation>;
export type PostDialogMutationResult = Apollo.MutationResult<PostDialogMutation>;
export type PostDialogMutationOptions = Apollo.BaseMutationOptions<PostDialogMutation, PostDialogMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!, $userName: String!) {
  userRegister(email: $email, password: $password, userName: $userName) {
    user {
      ...UserPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${UserPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      userName: // value for 'userName'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($TextInput: String!, $ReceiverId: String!) {
  senMessage(textInput: $TextInput, receiverId: $ReceiverId) {
    message {
      ...MessagePayload
    }
    error {
      ...RegularError
    }
  }
}
    ${MessagePayloadFragmentDoc}
${RegularErrorFragmentDoc}`;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      TextInput: // value for 'TextInput'
 *      ReceiverId: // value for 'ReceiverId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
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
export const GetMessagesDocument = gql`
    query getMessages {
  getMessages {
    messages {
      ...MessagePayload
    }
    error {
      ...RegularError
    }
  }
}
    ${MessagePayloadFragmentDoc}
${RegularErrorFragmentDoc}`;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetOrgDocument = gql`
    query GetOrg($OrgId: String!) {
  getOrg(orgId: $OrgId) {
    org {
      ...OrgPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${OrgPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;

/**
 * __useGetOrgQuery__
 *
 * To run a query within a React component, call `useGetOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgQuery({
 *   variables: {
 *      OrgId: // value for 'OrgId'
 *   },
 * });
 */
export function useGetOrgQuery(baseOptions: Apollo.QueryHookOptions<GetOrgQuery, GetOrgQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgQuery, GetOrgQueryVariables>(GetOrgDocument, options);
      }
export function useGetOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgQuery, GetOrgQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgQuery, GetOrgQueryVariables>(GetOrgDocument, options);
        }
export type GetOrgQueryHookResult = ReturnType<typeof useGetOrgQuery>;
export type GetOrgLazyQueryHookResult = ReturnType<typeof useGetOrgLazyQuery>;
export type GetOrgQueryResult = Apollo.QueryResult<GetOrgQuery, GetOrgQueryVariables>;
export const GetOrgsDocument = gql`
    query GetOrgs {
  getOrgs {
    orgs {
      id
      orgName
      location
    }
    error {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;

/**
 * __useGetOrgsQuery__
 *
 * To run a query within a React component, call `useGetOrgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrgsQuery(baseOptions?: Apollo.QueryHookOptions<GetOrgsQuery, GetOrgsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgsQuery, GetOrgsQueryVariables>(GetOrgsDocument, options);
      }
export function useGetOrgsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgsQuery, GetOrgsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgsQuery, GetOrgsQueryVariables>(GetOrgsDocument, options);
        }
export type GetOrgsQueryHookResult = ReturnType<typeof useGetOrgsQuery>;
export type GetOrgsLazyQueryHookResult = ReturnType<typeof useGetOrgsLazyQuery>;
export type GetOrgsQueryResult = Apollo.QueryResult<GetOrgsQuery, GetOrgsQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    users {
      ...UserPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${UserPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const MeUserDocument = gql`
    query MeUser {
  me {
    user {
      ...UserPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${UserPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;

/**
 * __useMeUserQuery__
 *
 * To run a query within a React component, call `useMeUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeUserQuery(baseOptions?: Apollo.QueryHookOptions<MeUserQuery, MeUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeUserQuery, MeUserQueryVariables>(MeUserDocument, options);
      }
export function useMeUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeUserQuery, MeUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeUserQuery, MeUserQueryVariables>(MeUserDocument, options);
        }
export type MeUserQueryHookResult = ReturnType<typeof useMeUserQuery>;
export type MeUserLazyQueryHookResult = ReturnType<typeof useMeUserLazyQuery>;
export type MeUserQueryResult = Apollo.QueryResult<MeUserQuery, MeUserQueryVariables>;
export const SubscriptDialogDocument = gql`
    subscription SubscriptDialog {
  dialogPosted {
    ...DialogPayload
  }
}
    ${DialogPayloadFragmentDoc}`;

/**
 * __useSubscriptDialogSubscription__
 *
 * To run a query within a React component, call `useSubscriptDialogSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscriptDialogSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscriptDialogSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscriptDialogSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscriptDialogSubscription, SubscriptDialogSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscriptDialogSubscription, SubscriptDialogSubscriptionVariables>(SubscriptDialogDocument, options);
      }
export type SubscriptDialogSubscriptionHookResult = ReturnType<typeof useSubscriptDialogSubscription>;
export type SubscriptDialogSubscriptionResult = Apollo.SubscriptionResult<SubscriptDialogSubscription>;