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
  dialogContent?: Maybe<Scalars['String']>;
  base?: Maybe<SecureBase>;
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
  content?: Maybe<Scalars['String']>;
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
  registerOrg?: Maybe<OrgPayload>;
  requestJoinOrg?: Maybe<OrgPayload>;
  acceptJoinOrg?: Maybe<OrgPayload>;
  sendMessage?: Maybe<MessagePayload>;
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
  email: Scalars['String'];
  phoneNumber: Scalars['String'];
};


export type MutationRequestJoinOrgArgs = {
  orgId: Scalars['String'];
};


export type MutationAcceptJoinOrgArgs = {
  requestUserId: Scalars['String'];
  requestedOrgId: Scalars['String'];
};


export type MutationSendMessageArgs = {
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
  orgName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  homePage?: Maybe<Scalars['String']>;
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
  /** get User's id, then show their own messages */
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

export type SecureBase = Node & {
  __typename?: 'SecureBase';
  /** GUID for a resource */
  id: Scalars['ID'];
  /** it indicate Client/Patient */
  baseOwner?: Maybe<User>;
  members?: Maybe<Array<Maybe<User>>>;
};

export type SecureBasePayload = {
  __typename?: 'SecureBasePayload';
  secureBase?: Maybe<SecureBase>;
  error?: Maybe<RegularError>;
};

export type Subscription = {
  __typename?: 'Subscription';
  dialogPosted?: Maybe<Dialog>;
};

export type User = Node & {
  __typename?: 'User';
  /** GUID for a resource */
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  /** user's image */
  picture?: Maybe<Scalars['String']>;
  belongOrgs?: Maybe<Array<Maybe<Org>>>;
  belongSecureBases?: Maybe<Array<Maybe<SecureBase>>>;
  messages?: Maybe<Array<Maybe<Message>>>;
  role?: Maybe<UserRole>;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  error?: Maybe<RegularError>;
};

export enum UserRole {
  User = 'USER',
  Pro = 'PRO'
}

export type DialogPayloadFragment = (
  { __typename?: 'Dialog' }
  & Pick<Dialog, 'id' | 'dialogContent'>
  & { base?: Maybe<(
    { __typename?: 'SecureBase' }
    & Pick<SecureBase, 'id'>
  )> }
);

export type MessagePayloadFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'content'>
);

export type OrgPayloadFragment = (
  { __typename?: 'Org' }
  & Pick<Org, 'id' | 'orgName' | 'location' | 'email' | 'phoneNumber' | 'image' | 'icon' | 'description' | 'homePage'>
  & { members?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'userName'>
  )>>> }
);

export type RegularErrorFragment = (
  { __typename?: 'RegularError' }
  & Pick<RegularError, 'message' | 'invalidField'>
);

export type SecureBasePayloadFragment = (
  { __typename?: 'SecureBase' }
  & Pick<SecureBase, 'id'>
  & { baseOwner?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )>, members?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )>>> }
);

export type UserPayloadFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'userName' | 'picture' | 'role'>
  & { belongOrgs?: Maybe<Array<Maybe<(
    { __typename?: 'Org' }
    & Pick<Org, 'id'>
  )>>>, belongSecureBases?: Maybe<Array<Maybe<(
    { __typename?: 'SecureBase' }
    & Pick<SecureBase, 'id'>
  )>>>, messages?: Maybe<Array<Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'id'>
  )>>> }
);

export type AcceptJoinOrgMutationVariables = Exact<{
  requestUserId: Scalars['String'];
  requestedOrgId: Scalars['String'];
}>;


export type AcceptJoinOrgMutation = (
  { __typename?: 'Mutation' }
  & { acceptJoinOrg?: Maybe<(
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

export type RegisterOrgMutationVariables = Exact<{
  orgName: Scalars['String'];
  orgEmail: Scalars['String'];
  orgPhoneNumber: Scalars['String'];
  orgLocation: Scalars['String'];
}>;


export type RegisterOrgMutation = (
  { __typename?: 'Mutation' }
  & { registerOrg?: Maybe<(
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

export type RequestJoinOrgMutationVariables = Exact<{
  requestOrgId: Scalars['String'];
}>;


export type RequestJoinOrgMutation = (
  { __typename?: 'Mutation' }
  & { requestJoinOrg?: Maybe<(
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

export type SendMessageMutationVariables = Exact<{
  TextInput: Scalars['String'];
  ReceiverId: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage?: Maybe<(
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

export type GetMyInfoDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyInfoDetailQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'userName' | 'picture' | 'role'>
      & { belongOrgs?: Maybe<Array<Maybe<(
        { __typename?: 'Org' }
        & OrgPayloadFragment
      )>>>, belongSecureBases?: Maybe<Array<Maybe<(
        { __typename?: 'SecureBase' }
        & SecureBasePayloadFragment
      )>>>, messages?: Maybe<Array<Maybe<(
        { __typename?: 'Message' }
        & MessagePayloadFragment
      )>>> }
    )>, error?: Maybe<(
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
  base {
    id
  }
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
  email
  phoneNumber
  image
  icon
  description
  homePage
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
export const SecureBasePayloadFragmentDoc = gql`
    fragment SecureBasePayload on SecureBase {
  id
  baseOwner {
    id
  }
  members {
    id
  }
}
    `;
export const UserPayloadFragmentDoc = gql`
    fragment UserPayload on User {
  id
  email
  userName
  picture
  role
  belongOrgs {
    id
  }
  belongSecureBases {
    id
  }
  messages {
    id
  }
}
    `;
export const AcceptJoinOrgDocument = gql`
    mutation AcceptJoinOrg($requestUserId: String!, $requestedOrgId: String!) {
  acceptJoinOrg(requestUserId: $requestUserId, requestedOrgId: $requestedOrgId) {
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
export type AcceptJoinOrgMutationFn = Apollo.MutationFunction<AcceptJoinOrgMutation, AcceptJoinOrgMutationVariables>;

/**
 * __useAcceptJoinOrgMutation__
 *
 * To run a mutation, you first call `useAcceptJoinOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptJoinOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptJoinOrgMutation, { data, loading, error }] = useAcceptJoinOrgMutation({
 *   variables: {
 *      requestUserId: // value for 'requestUserId'
 *      requestedOrgId: // value for 'requestedOrgId'
 *   },
 * });
 */
export function useAcceptJoinOrgMutation(baseOptions?: Apollo.MutationHookOptions<AcceptJoinOrgMutation, AcceptJoinOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptJoinOrgMutation, AcceptJoinOrgMutationVariables>(AcceptJoinOrgDocument, options);
      }
export type AcceptJoinOrgMutationHookResult = ReturnType<typeof useAcceptJoinOrgMutation>;
export type AcceptJoinOrgMutationResult = Apollo.MutationResult<AcceptJoinOrgMutation>;
export type AcceptJoinOrgMutationOptions = Apollo.BaseMutationOptions<AcceptJoinOrgMutation, AcceptJoinOrgMutationVariables>;
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
export const RegisterOrgDocument = gql`
    mutation RegisterOrg($orgName: String!, $orgEmail: String!, $orgPhoneNumber: String!, $orgLocation: String!) {
  registerOrg(
    name: $orgName
    email: $orgEmail
    phoneNumber: $orgPhoneNumber
    location: $orgLocation
  ) {
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
export type RegisterOrgMutationFn = Apollo.MutationFunction<RegisterOrgMutation, RegisterOrgMutationVariables>;

/**
 * __useRegisterOrgMutation__
 *
 * To run a mutation, you first call `useRegisterOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerOrgMutation, { data, loading, error }] = useRegisterOrgMutation({
 *   variables: {
 *      orgName: // value for 'orgName'
 *      orgEmail: // value for 'orgEmail'
 *      orgPhoneNumber: // value for 'orgPhoneNumber'
 *      orgLocation: // value for 'orgLocation'
 *   },
 * });
 */
export function useRegisterOrgMutation(baseOptions?: Apollo.MutationHookOptions<RegisterOrgMutation, RegisterOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterOrgMutation, RegisterOrgMutationVariables>(RegisterOrgDocument, options);
      }
export type RegisterOrgMutationHookResult = ReturnType<typeof useRegisterOrgMutation>;
export type RegisterOrgMutationResult = Apollo.MutationResult<RegisterOrgMutation>;
export type RegisterOrgMutationOptions = Apollo.BaseMutationOptions<RegisterOrgMutation, RegisterOrgMutationVariables>;
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
export const RequestJoinOrgDocument = gql`
    mutation requestJoinOrg($requestOrgId: String!) {
  requestJoinOrg(orgId: $requestOrgId) {
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
export type RequestJoinOrgMutationFn = Apollo.MutationFunction<RequestJoinOrgMutation, RequestJoinOrgMutationVariables>;

/**
 * __useRequestJoinOrgMutation__
 *
 * To run a mutation, you first call `useRequestJoinOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestJoinOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestJoinOrgMutation, { data, loading, error }] = useRequestJoinOrgMutation({
 *   variables: {
 *      requestOrgId: // value for 'requestOrgId'
 *   },
 * });
 */
export function useRequestJoinOrgMutation(baseOptions?: Apollo.MutationHookOptions<RequestJoinOrgMutation, RequestJoinOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestJoinOrgMutation, RequestJoinOrgMutationVariables>(RequestJoinOrgDocument, options);
      }
export type RequestJoinOrgMutationHookResult = ReturnType<typeof useRequestJoinOrgMutation>;
export type RequestJoinOrgMutationResult = Apollo.MutationResult<RequestJoinOrgMutation>;
export type RequestJoinOrgMutationOptions = Apollo.BaseMutationOptions<RequestJoinOrgMutation, RequestJoinOrgMutationVariables>;
export const SendMessageDocument = gql`
    mutation SendMessage($TextInput: String!, $ReceiverId: String!) {
  sendMessage(textInput: $TextInput, receiverId: $ReceiverId) {
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
    query GetMessages {
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
export const GetMyInfoDetailDocument = gql`
    query GetMyInfoDetail {
  me {
    user {
      id
      email
      userName
      picture
      role
      belongOrgs {
        ...OrgPayload
      }
      belongSecureBases {
        ...SecureBasePayload
      }
      messages {
        ...MessagePayload
      }
    }
    error {
      ...RegularError
    }
  }
}
    ${OrgPayloadFragmentDoc}
${SecureBasePayloadFragmentDoc}
${MessagePayloadFragmentDoc}
${RegularErrorFragmentDoc}`;

/**
 * __useGetMyInfoDetailQuery__
 *
 * To run a query within a React component, call `useGetMyInfoDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyInfoDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyInfoDetailQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyInfoDetailQuery(baseOptions?: Apollo.QueryHookOptions<GetMyInfoDetailQuery, GetMyInfoDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyInfoDetailQuery, GetMyInfoDetailQueryVariables>(GetMyInfoDetailDocument, options);
      }
export function useGetMyInfoDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyInfoDetailQuery, GetMyInfoDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyInfoDetailQuery, GetMyInfoDetailQueryVariables>(GetMyInfoDetailDocument, options);
        }
export type GetMyInfoDetailQueryHookResult = ReturnType<typeof useGetMyInfoDetailQuery>;
export type GetMyInfoDetailLazyQueryHookResult = ReturnType<typeof useGetMyInfoDetailLazyQuery>;
export type GetMyInfoDetailQueryResult = Apollo.QueryResult<GetMyInfoDetailQuery, GetMyInfoDetailQueryVariables>;
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