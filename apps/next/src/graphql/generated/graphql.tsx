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

/** Inquiry from User to Org */
export type Inquiry = Node & {
  __typename?: 'Inquiry';
  /** GUID for a resource */
  id: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
  sentAt?: Maybe<Scalars['String']>;
  category?: Maybe<InquiryCategory>;
  inquiryStatus?: Maybe<InquiryStatus>;
  sender?: Maybe<User>;
  tree?: Maybe<InquiryTree>;
};

export enum InquiryCategory {
  Counsel = 'COUNSEL',
  Inquiry = 'INQUIRY',
  Contact = 'CONTACT',
  Application = 'APPLICATION',
  Others = 'OTHERS'
}

export type InquiryPayload = {
  __typename?: 'InquiryPayload';
  inquiry?: Maybe<Inquiry>;
  inquiries?: Maybe<Array<Maybe<Inquiry>>>;
  inquiryTree?: Maybe<InquiryTree>;
  error?: Maybe<RegularError>;
};

export enum InquiryStatus {
  Unread = 'UNREAD',
  Done = 'DONE',
  Working = 'WORKING',
  Draft = 'DRAFT'
}

/** Inquiries Node, it connect original and response inquiry */
export type InquiryTree = Node & {
  __typename?: 'InquiryTree';
  /** GUID for a resource */
  id: Scalars['ID'];
  treedInquiry?: Maybe<Array<Maybe<Inquiry>>>;
};

/** Message from User to User */
export type Message = Node & {
  __typename?: 'Message';
  /** GUID for a resource */
  id: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
  sentAt?: Maybe<Scalars['String']>;
  messageStatus?: Maybe<MessageStatus>;
  sender?: Maybe<User>;
  receiver?: Maybe<User>;
  tree?: Maybe<MessageTree>;
};

export type MessagePayload = {
  __typename?: 'MessagePayload';
  message?: Maybe<Message>;
  messages?: Maybe<Array<Maybe<Message>>>;
  messageTree?: Maybe<MessageTree>;
  error?: Maybe<RegularError>;
};

export enum MessageStatus {
  Unread = 'UNREAD',
  Read = 'READ',
  Draft = 'DRAFT'
}

/** Messages Node, it connect original and response Message */
export type MessageTree = Node & {
  __typename?: 'MessageTree';
  /** GUID for a resource */
  id: Scalars['ID'];
  treedMessage?: Maybe<Array<Maybe<Message>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser?: Maybe<UserPayload>;
  login?: Maybe<UserPayload>;
  logout?: Maybe<RegularPayload>;
  deleteUser?: Maybe<RegularPayload>;
  forgetPassword?: Maybe<RegularPayload>;
  changePassword?: Maybe<RegularPayload>;
  updateUser?: Maybe<UserPayload>;
  postDialog?: Maybe<DialogPayload>;
  registerOrg?: Maybe<OrgPayload>;
  requestJoinOrg?: Maybe<OrgPayload>;
  acceptJoinOrg?: Maybe<OrgPayload>;
  sendMessage?: Maybe<MessagePayload>;
  replyMessage?: Maybe<MessagePayload>;
  sendInquiry?: Maybe<InquiryPayload>;
  replyInquiry?: Maybe<InquiryPayload>;
};


export type MutationRegisterUserArgs = {
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


export type MutationUpdateUserArgs = {
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
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


export type MutationReplyMessageArgs = {
  content: Scalars['String'];
  replyTargetId: Scalars['String'];
};


export type MutationSendInquiryArgs = {
  textInput: Scalars['String'];
  receiverId: Scalars['String'];
  orgId: Scalars['String'];
  category?: Maybe<InquiryCategory>;
  status?: Maybe<InquiryStatus>;
};


export type MutationReplyInquiryArgs = {
  content: Scalars['String'];
  replyTargetId: Scalars['String'];
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
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  homePage?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<User>>>;
  inquiries?: Maybe<Array<Maybe<Inquiry>>>;
};

export type OrgPayload = {
  __typename?: 'OrgPayload';
  org?: Maybe<Org>;
  orgs?: Maybe<Array<Maybe<Org>>>;
  error?: Maybe<RegularError>;
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  getUsers: UserPayload;
  getUserById?: Maybe<UserPayload>;
  getUserByIdWithOrg?: Maybe<UserPayload>;
  getUserByCookie?: Maybe<UserPayload>;
  getOrgs?: Maybe<OrgPayload>;
  getOrgPublicInfoById?: Maybe<OrgPayload>;
  getOrgPrivateInfoByIdAndCookie?: Maybe<OrgPayload>;
  getOrgsByMemberCookie?: Maybe<OrgPayload>;
  /** get User's id, then show their own messages */
  getMessagesByCookie?: Maybe<MessagePayload>;
  getMessagesByTreeId?: Maybe<MessagePayload>;
  /** get inquiries of one Org */
  getInquiriesByOrgId?: Maybe<InquiryPayload>;
  getInquiry?: Maybe<InquiryPayload>;
  getInquiriesWithStatus?: Maybe<InquiryPayload>;
  getInquiriesByTreeIdAndCookie?: Maybe<InquiryPayload>;
};


export type QueryNodeArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserByIdWithOrgArgs = {
  userId: Scalars['String'];
};


export type QueryGetOrgPublicInfoByIdArgs = {
  orgId: Scalars['String'];
};


export type QueryGetOrgPrivateInfoByIdAndCookieArgs = {
  orgId: Scalars['String'];
};


export type QueryGetMessagesByTreeIdArgs = {
  treeId: Scalars['String'];
};


export type QueryGetInquiriesByOrgIdArgs = {
  orgId: Scalars['String'];
};


export type QueryGetInquiryArgs = {
  inquiryId: Scalars['String'];
};


export type QueryGetInquiriesWithStatusArgs = {
  orgId: Scalars['String'];
  status?: Maybe<InquiryStatus>;
};


export type QueryGetInquiriesByTreeIdAndCookieArgs = {
  treeId: Scalars['String'];
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

/** Place to dialog used by Professionals and Clients */
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
  /** avatar used for icon */
  avatar?: Maybe<Scalars['String']>;
  /** hero image used for individual page */
  image?: Maybe<Scalars['String']>;
  /** self description */
  description?: Maybe<Scalars['String']>;
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

export type InquiryPayloadFragment = (
  { __typename?: 'Inquiry' }
  & Pick<Inquiry, 'id' | 'content' | 'sentAt' | 'category' | 'inquiryStatus'>
  & { sender?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )>, tree?: Maybe<(
    { __typename?: 'InquiryTree' }
    & Pick<InquiryTree, 'id'>
  )> }
);

export type InquiryTreePayloadFragment = (
  { __typename?: 'InquiryTree' }
  & Pick<InquiryTree, 'id'>
  & { treedInquiry?: Maybe<Array<Maybe<(
    { __typename?: 'Inquiry' }
    & Pick<Inquiry, 'id'>
  )>>> }
);

export type MessagePayloadFragment = (
  { __typename?: 'Message' }
  & Pick<Message, 'id' | 'content' | 'messageStatus' | 'sentAt'>
  & { receiver?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
  )>, sender?: Maybe<(
    { __typename?: 'User' }
    & UserPayloadFragment
  )>, tree?: Maybe<(
    { __typename?: 'MessageTree' }
    & MessageTreePayloadFragment
  )> }
);

export type MessageTreePayloadFragment = (
  { __typename?: 'MessageTree' }
  & Pick<MessageTree, 'id'>
  & { treedMessage?: Maybe<Array<Maybe<(
    { __typename?: 'Message' }
    & Pick<Message, 'id'>
  )>>> }
);

export type OrgDetailPayloadFragment = (
  { __typename?: 'Org' }
  & Pick<Org, 'id' | 'orgName' | 'location' | 'email' | 'phoneNumber' | 'image' | 'avatar' | 'description' | 'homePage'>
  & { members?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'userName' | 'avatar' | 'description'>
  )>>>, inquiries?: Maybe<Array<Maybe<(
    { __typename?: 'Inquiry' }
    & Pick<Inquiry, 'id' | 'content' | 'sentAt' | 'category' | 'inquiryStatus'>
    & { tree?: Maybe<(
      { __typename?: 'InquiryTree' }
      & Pick<InquiryTree, 'id'>
    )>, sender?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )>>> }
);

export type OrgPayloadFragment = (
  { __typename?: 'Org' }
  & Pick<Org, 'id' | 'orgName' | 'location' | 'email' | 'phoneNumber' | 'image' | 'avatar' | 'description' | 'homePage'>
  & { members?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'userName' | 'avatar' | 'description'>
  )>>>, inquiries?: Maybe<Array<Maybe<(
    { __typename?: 'Inquiry' }
    & Pick<Inquiry, 'id'>
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

export type UserDetailPayloadFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'userName' | 'description' | 'avatar' | 'image' | 'role'>
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
);

export type UserPayloadFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'userName' | 'description' | 'avatar' | 'image' | 'role'>
  & { belongOrgs?: Maybe<Array<Maybe<(
    { __typename?: 'Org' }
    & Pick<Org, 'id' | 'orgName'>
  )>>>, belongSecureBases?: Maybe<Array<Maybe<(
    { __typename?: 'SecureBase' }
    & Pick<SecureBase, 'id'>
    & { baseOwner?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'userName'>
    )> }
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
  & { registerUser?: Maybe<(
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

export type ReplyInquiryMutationVariables = Exact<{
  content: Scalars['String'];
  targetId: Scalars['String'];
}>;


export type ReplyInquiryMutation = (
  { __typename?: 'Mutation' }
  & { replyInquiry?: Maybe<(
    { __typename?: 'InquiryPayload' }
    & { inquiry?: Maybe<(
      { __typename?: 'Inquiry' }
      & InquiryPayloadFragment
    )>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type ReplyMessageMutationVariables = Exact<{
  content: Scalars['String'];
  replyTargetId: Scalars['String'];
}>;


export type ReplyMessageMutation = (
  { __typename?: 'Mutation' }
  & { replyMessage?: Maybe<(
    { __typename?: 'MessagePayload' }
    & { message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'content' | 'messageStatus' | 'sentAt'>
      & { tree?: Maybe<(
        { __typename?: 'MessageTree' }
        & Pick<MessageTree, 'id'>
      )> }
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

export type SendInquiryMutationVariables = Exact<{
  textInput: Scalars['String'];
  receiverId: Scalars['String'];
  orgId: Scalars['String'];
  category?: Maybe<InquiryCategory>;
  status?: Maybe<InquiryStatus>;
}>;


export type SendInquiryMutation = (
  { __typename?: 'Mutation' }
  & { sendInquiry?: Maybe<(
    { __typename?: 'InquiryPayload' }
    & { inquiry?: Maybe<(
      { __typename?: 'Inquiry' }
      & InquiryPayloadFragment
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

export type UpdateUserMutationVariables = Exact<{
  userName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
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

export type GetInquiriesByOrgIdQueryVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type GetInquiriesByOrgIdQuery = (
  { __typename?: 'Query' }
  & { getInquiriesByOrgId?: Maybe<(
    { __typename?: 'InquiryPayload' }
    & { inquiries?: Maybe<Array<Maybe<(
      { __typename?: 'Inquiry' }
      & InquiryPayloadFragment
    )>>>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type GetInquiriesByTreeIdAndCookieQueryVariables = Exact<{
  treeId: Scalars['String'];
}>;


export type GetInquiriesByTreeIdAndCookieQuery = (
  { __typename?: 'Query' }
  & { getInquiriesByTreeIdAndCookie?: Maybe<(
    { __typename?: 'InquiryPayload' }
    & { inquiryTree?: Maybe<(
      { __typename?: 'InquiryTree' }
      & Pick<InquiryTree, 'id'>
      & { treedInquiry?: Maybe<Array<Maybe<(
        { __typename?: 'Inquiry' }
        & Pick<Inquiry, 'id' | 'content' | 'sentAt' | 'inquiryStatus' | 'category'>
        & { sender?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'userName' | 'avatar' | 'description'>
        )> }
      )>>> }
    )>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type GetInquiriesWithStatusQueryVariables = Exact<{
  orgId: Scalars['String'];
  status?: Maybe<InquiryStatus>;
}>;


export type GetInquiriesWithStatusQuery = (
  { __typename?: 'Query' }
  & { getInquiriesWithStatus?: Maybe<(
    { __typename?: 'InquiryPayload' }
    & { inquiries?: Maybe<Array<Maybe<(
      { __typename?: 'Inquiry' }
      & InquiryPayloadFragment
    )>>> }
  )> }
);

export type GetInquiryQueryVariables = Exact<{
  inquiryId: Scalars['String'];
}>;


export type GetInquiryQuery = (
  { __typename?: 'Query' }
  & { getInquiry?: Maybe<(
    { __typename?: 'InquiryPayload' }
    & { inquiry?: Maybe<(
      { __typename?: 'Inquiry' }
      & InquiryPayloadFragment
    )>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type GetMessagesByTreeIdQueryVariables = Exact<{
  treeId: Scalars['String'];
}>;


export type GetMessagesByTreeIdQuery = (
  { __typename?: 'Query' }
  & { getMessagesByTreeId?: Maybe<(
    { __typename?: 'MessagePayload' }
    & { messageTree?: Maybe<(
      { __typename?: 'MessageTree' }
      & Pick<MessageTree, 'id'>
      & { treedMessage?: Maybe<Array<Maybe<(
        { __typename?: 'Message' }
        & Pick<Message, 'id' | 'content' | 'sentAt' | 'messageStatus'>
        & { sender?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'userName' | 'avatar' | 'image' | 'description' | 'role'>
        )>, receiver?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id'>
        )> }
      )>>> }
    )>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type GetMessagesByCookieQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMessagesByCookieQuery = (
  { __typename?: 'Query' }
  & { getMessagesByCookie?: Maybe<(
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

export type GetOrgPublicInfoByIdQueryVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type GetOrgPublicInfoByIdQuery = (
  { __typename?: 'Query' }
  & { getOrgPublicInfoById?: Maybe<(
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

export type GetOrgPrivateInfoByIdAndCookieQueryVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type GetOrgPrivateInfoByIdAndCookieQuery = (
  { __typename?: 'Query' }
  & { getOrgPrivateInfoByIdAndCookie?: Maybe<(
    { __typename?: 'OrgPayload' }
    & { org?: Maybe<(
      { __typename?: 'Org' }
      & Pick<Org, 'id' | 'orgName' | 'location' | 'email' | 'phoneNumber' | 'avatar' | 'image' | 'description' | 'homePage'>
      & { members?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'userName' | 'avatar' | 'description'>
      )>>>, inquiries?: Maybe<Array<Maybe<(
        { __typename?: 'Inquiry' }
        & Pick<Inquiry, 'id' | 'content' | 'sentAt' | 'category' | 'inquiryStatus'>
        & { sender?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'userName' | 'avatar'>
        )>, tree?: Maybe<(
          { __typename?: 'InquiryTree' }
          & Pick<InquiryTree, 'id'>
        )> }
      )>>> }
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

export type GetOrgsByMemberCookieQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrgsByMemberCookieQuery = (
  { __typename?: 'Query' }
  & { getOrgsByMemberCookie?: Maybe<(
    { __typename?: 'OrgPayload' }
    & { orgs?: Maybe<Array<Maybe<(
      { __typename?: 'Org' }
      & OrgDetailPayloadFragment
    )>>>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { getUserById?: Maybe<(
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

export type GetUserByCookieQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByCookieQuery = (
  { __typename?: 'Query' }
  & { getUserByCookie?: Maybe<(
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

export type GetUserByIdWithOrgQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserByIdWithOrgQuery = (
  { __typename?: 'Query' }
  & { getUserByIdWithOrg?: Maybe<(
    { __typename?: 'UserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'userName' | 'image' | 'avatar' | 'description'>
      & { belongOrgs?: Maybe<Array<Maybe<(
        { __typename?: 'Org' }
        & Pick<Org, 'id' | 'orgName' | 'location' | 'email' | 'phoneNumber' | 'image' | 'avatar' | 'description' | 'homePage'>
      )>>> }
    )>, error?: Maybe<(
      { __typename?: 'RegularError' }
      & RegularErrorFragment
    )> }
  )> }
);

export type GetUserPrivateInfoByCookieQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserPrivateInfoByCookieQuery = (
  { __typename?: 'Query' }
  & { getUserByCookie?: Maybe<(
    { __typename?: 'UserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserDetailPayloadFragment
    )>, error?: Maybe<(
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
export const InquiryPayloadFragmentDoc = gql`
    fragment InquiryPayload on Inquiry {
  id
  content
  sentAt
  category
  inquiryStatus
  sender {
    id
  }
  tree {
    id
  }
}
    `;
export const InquiryTreePayloadFragmentDoc = gql`
    fragment InquiryTreePayload on InquiryTree {
  id
  treedInquiry {
    id
  }
}
    `;
export const OrgDetailPayloadFragmentDoc = gql`
    fragment OrgDetailPayload on Org {
  id
  orgName
  location
  email
  phoneNumber
  image
  avatar
  description
  homePage
  members {
    id
    userName
    avatar
    description
  }
  inquiries {
    id
    content
    sentAt
    category
    tree {
      id
    }
    inquiryStatus
    sender {
      id
    }
  }
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on RegularError {
  message
  invalidField
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
  avatar
  description
  homePage
  members {
    id
    userName
    avatar
    description
  }
  inquiries {
    id
  }
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
  description
  avatar
  image
  role
  belongOrgs {
    id
    orgName
  }
  belongSecureBases {
    id
    baseOwner {
      id
      userName
    }
  }
}
    `;
export const MessageTreePayloadFragmentDoc = gql`
    fragment MessageTreePayload on MessageTree {
  id
  treedMessage {
    id
  }
}
    `;
export const MessagePayloadFragmentDoc = gql`
    fragment MessagePayload on Message {
  id
  content
  messageStatus
  sentAt
  receiver {
    id
  }
  sender {
    ...UserPayload
  }
  tree {
    ...MessageTreePayload
  }
}
    ${UserPayloadFragmentDoc}
${MessageTreePayloadFragmentDoc}`;
export const UserDetailPayloadFragmentDoc = gql`
    fragment UserDetailPayload on User {
  id
  email
  userName
  description
  avatar
  image
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
    ${OrgPayloadFragmentDoc}
${SecureBasePayloadFragmentDoc}
${MessagePayloadFragmentDoc}`;
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
  registerUser(email: $email, password: $password, userName: $userName) {
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
export const ReplyInquiryDocument = gql`
    mutation replyInquiry($content: String!, $targetId: String!) {
  replyInquiry(content: $content, replyTargetId: $targetId) {
    inquiry {
      ...InquiryPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${InquiryPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;
export type ReplyInquiryMutationFn = Apollo.MutationFunction<ReplyInquiryMutation, ReplyInquiryMutationVariables>;

/**
 * __useReplyInquiryMutation__
 *
 * To run a mutation, you first call `useReplyInquiryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyInquiryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyInquiryMutation, { data, loading, error }] = useReplyInquiryMutation({
 *   variables: {
 *      content: // value for 'content'
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useReplyInquiryMutation(baseOptions?: Apollo.MutationHookOptions<ReplyInquiryMutation, ReplyInquiryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplyInquiryMutation, ReplyInquiryMutationVariables>(ReplyInquiryDocument, options);
      }
export type ReplyInquiryMutationHookResult = ReturnType<typeof useReplyInquiryMutation>;
export type ReplyInquiryMutationResult = Apollo.MutationResult<ReplyInquiryMutation>;
export type ReplyInquiryMutationOptions = Apollo.BaseMutationOptions<ReplyInquiryMutation, ReplyInquiryMutationVariables>;
export const ReplyMessageDocument = gql`
    mutation replyMessage($content: String!, $replyTargetId: String!) {
  replyMessage(content: $content, replyTargetId: $replyTargetId) {
    message {
      id
      content
      messageStatus
      sentAt
      tree {
        id
      }
    }
    error {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;
export type ReplyMessageMutationFn = Apollo.MutationFunction<ReplyMessageMutation, ReplyMessageMutationVariables>;

/**
 * __useReplyMessageMutation__
 *
 * To run a mutation, you first call `useReplyMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyMessageMutation, { data, loading, error }] = useReplyMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      replyTargetId: // value for 'replyTargetId'
 *   },
 * });
 */
export function useReplyMessageMutation(baseOptions?: Apollo.MutationHookOptions<ReplyMessageMutation, ReplyMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplyMessageMutation, ReplyMessageMutationVariables>(ReplyMessageDocument, options);
      }
export type ReplyMessageMutationHookResult = ReturnType<typeof useReplyMessageMutation>;
export type ReplyMessageMutationResult = Apollo.MutationResult<ReplyMessageMutation>;
export type ReplyMessageMutationOptions = Apollo.BaseMutationOptions<ReplyMessageMutation, ReplyMessageMutationVariables>;
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
export const SendInquiryDocument = gql`
    mutation SendInquiry($textInput: String!, $receiverId: String!, $orgId: String!, $category: InquiryCategory, $status: InquiryStatus) {
  sendInquiry(
    textInput: $textInput
    receiverId: $receiverId
    category: $category
    status: $status
    orgId: $orgId
  ) {
    inquiry {
      ...InquiryPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${InquiryPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;
export type SendInquiryMutationFn = Apollo.MutationFunction<SendInquiryMutation, SendInquiryMutationVariables>;

/**
 * __useSendInquiryMutation__
 *
 * To run a mutation, you first call `useSendInquiryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendInquiryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendInquiryMutation, { data, loading, error }] = useSendInquiryMutation({
 *   variables: {
 *      textInput: // value for 'textInput'
 *      receiverId: // value for 'receiverId'
 *      orgId: // value for 'orgId'
 *      category: // value for 'category'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSendInquiryMutation(baseOptions?: Apollo.MutationHookOptions<SendInquiryMutation, SendInquiryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendInquiryMutation, SendInquiryMutationVariables>(SendInquiryDocument, options);
      }
export type SendInquiryMutationHookResult = ReturnType<typeof useSendInquiryMutation>;
export type SendInquiryMutationResult = Apollo.MutationResult<SendInquiryMutation>;
export type SendInquiryMutationOptions = Apollo.BaseMutationOptions<SendInquiryMutation, SendInquiryMutationVariables>;
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
export const UpdateUserDocument = gql`
    mutation UpdateUser($userName: String, $email: String, $description: String, $avatar: String, $image: String) {
  updateUser(
    userName: $userName
    email: $email
    description: $description
    avatar: $avatar
    image: $image
  ) {
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
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userName: // value for 'userName'
 *      email: // value for 'email'
 *      description: // value for 'description'
 *      avatar: // value for 'avatar'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
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
export const GetInquiriesByOrgIdDocument = gql`
    query GetInquiriesByOrgId($orgId: String!) {
  getInquiriesByOrgId(orgId: $orgId) {
    inquiries {
      ...InquiryPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${InquiryPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;

/**
 * __useGetInquiriesByOrgIdQuery__
 *
 * To run a query within a React component, call `useGetInquiriesByOrgIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInquiriesByOrgIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInquiriesByOrgIdQuery({
 *   variables: {
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useGetInquiriesByOrgIdQuery(baseOptions: Apollo.QueryHookOptions<GetInquiriesByOrgIdQuery, GetInquiriesByOrgIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInquiriesByOrgIdQuery, GetInquiriesByOrgIdQueryVariables>(GetInquiriesByOrgIdDocument, options);
      }
export function useGetInquiriesByOrgIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInquiriesByOrgIdQuery, GetInquiriesByOrgIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInquiriesByOrgIdQuery, GetInquiriesByOrgIdQueryVariables>(GetInquiriesByOrgIdDocument, options);
        }
export type GetInquiriesByOrgIdQueryHookResult = ReturnType<typeof useGetInquiriesByOrgIdQuery>;
export type GetInquiriesByOrgIdLazyQueryHookResult = ReturnType<typeof useGetInquiriesByOrgIdLazyQuery>;
export type GetInquiriesByOrgIdQueryResult = Apollo.QueryResult<GetInquiriesByOrgIdQuery, GetInquiriesByOrgIdQueryVariables>;
export const GetInquiriesByTreeIdAndCookieDocument = gql`
    query GetInquiriesByTreeIdAndCookie($treeId: String!) {
  getInquiriesByTreeIdAndCookie(treeId: $treeId) {
    inquiryTree {
      id
      treedInquiry {
        id
        content
        sentAt
        inquiryStatus
        category
        sender {
          id
          userName
          avatar
          description
        }
      }
    }
    error {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;

/**
 * __useGetInquiriesByTreeIdAndCookieQuery__
 *
 * To run a query within a React component, call `useGetInquiriesByTreeIdAndCookieQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInquiriesByTreeIdAndCookieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInquiriesByTreeIdAndCookieQuery({
 *   variables: {
 *      treeId: // value for 'treeId'
 *   },
 * });
 */
export function useGetInquiriesByTreeIdAndCookieQuery(baseOptions: Apollo.QueryHookOptions<GetInquiriesByTreeIdAndCookieQuery, GetInquiriesByTreeIdAndCookieQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInquiriesByTreeIdAndCookieQuery, GetInquiriesByTreeIdAndCookieQueryVariables>(GetInquiriesByTreeIdAndCookieDocument, options);
      }
export function useGetInquiriesByTreeIdAndCookieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInquiriesByTreeIdAndCookieQuery, GetInquiriesByTreeIdAndCookieQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInquiriesByTreeIdAndCookieQuery, GetInquiriesByTreeIdAndCookieQueryVariables>(GetInquiriesByTreeIdAndCookieDocument, options);
        }
export type GetInquiriesByTreeIdAndCookieQueryHookResult = ReturnType<typeof useGetInquiriesByTreeIdAndCookieQuery>;
export type GetInquiriesByTreeIdAndCookieLazyQueryHookResult = ReturnType<typeof useGetInquiriesByTreeIdAndCookieLazyQuery>;
export type GetInquiriesByTreeIdAndCookieQueryResult = Apollo.QueryResult<GetInquiriesByTreeIdAndCookieQuery, GetInquiriesByTreeIdAndCookieQueryVariables>;
export const GetInquiriesWithStatusDocument = gql`
    query getInquiriesWithStatus($orgId: String!, $status: InquiryStatus) {
  getInquiriesWithStatus(orgId: $orgId, status: $status) {
    inquiries {
      ...InquiryPayload
    }
  }
}
    ${InquiryPayloadFragmentDoc}`;

/**
 * __useGetInquiriesWithStatusQuery__
 *
 * To run a query within a React component, call `useGetInquiriesWithStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInquiriesWithStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInquiriesWithStatusQuery({
 *   variables: {
 *      orgId: // value for 'orgId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetInquiriesWithStatusQuery(baseOptions: Apollo.QueryHookOptions<GetInquiriesWithStatusQuery, GetInquiriesWithStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInquiriesWithStatusQuery, GetInquiriesWithStatusQueryVariables>(GetInquiriesWithStatusDocument, options);
      }
export function useGetInquiriesWithStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInquiriesWithStatusQuery, GetInquiriesWithStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInquiriesWithStatusQuery, GetInquiriesWithStatusQueryVariables>(GetInquiriesWithStatusDocument, options);
        }
export type GetInquiriesWithStatusQueryHookResult = ReturnType<typeof useGetInquiriesWithStatusQuery>;
export type GetInquiriesWithStatusLazyQueryHookResult = ReturnType<typeof useGetInquiriesWithStatusLazyQuery>;
export type GetInquiriesWithStatusQueryResult = Apollo.QueryResult<GetInquiriesWithStatusQuery, GetInquiriesWithStatusQueryVariables>;
export const GetInquiryDocument = gql`
    query GetInquiry($inquiryId: String!) {
  getInquiry(inquiryId: $inquiryId) {
    inquiry {
      ...InquiryPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${InquiryPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;

/**
 * __useGetInquiryQuery__
 *
 * To run a query within a React component, call `useGetInquiryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInquiryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInquiryQuery({
 *   variables: {
 *      inquiryId: // value for 'inquiryId'
 *   },
 * });
 */
export function useGetInquiryQuery(baseOptions: Apollo.QueryHookOptions<GetInquiryQuery, GetInquiryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInquiryQuery, GetInquiryQueryVariables>(GetInquiryDocument, options);
      }
export function useGetInquiryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInquiryQuery, GetInquiryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInquiryQuery, GetInquiryQueryVariables>(GetInquiryDocument, options);
        }
export type GetInquiryQueryHookResult = ReturnType<typeof useGetInquiryQuery>;
export type GetInquiryLazyQueryHookResult = ReturnType<typeof useGetInquiryLazyQuery>;
export type GetInquiryQueryResult = Apollo.QueryResult<GetInquiryQuery, GetInquiryQueryVariables>;
export const GetMessagesByTreeIdDocument = gql`
    query GetMessagesByTreeId($treeId: String!) {
  getMessagesByTreeId(treeId: $treeId) {
    messageTree {
      id
      treedMessage {
        id
        content
        sentAt
        messageStatus
        sender {
          id
          userName
          avatar
          image
          description
          role
        }
        receiver {
          id
        }
      }
    }
    error {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;

/**
 * __useGetMessagesByTreeIdQuery__
 *
 * To run a query within a React component, call `useGetMessagesByTreeIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesByTreeIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesByTreeIdQuery({
 *   variables: {
 *      treeId: // value for 'treeId'
 *   },
 * });
 */
export function useGetMessagesByTreeIdQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesByTreeIdQuery, GetMessagesByTreeIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesByTreeIdQuery, GetMessagesByTreeIdQueryVariables>(GetMessagesByTreeIdDocument, options);
      }
export function useGetMessagesByTreeIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesByTreeIdQuery, GetMessagesByTreeIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesByTreeIdQuery, GetMessagesByTreeIdQueryVariables>(GetMessagesByTreeIdDocument, options);
        }
export type GetMessagesByTreeIdQueryHookResult = ReturnType<typeof useGetMessagesByTreeIdQuery>;
export type GetMessagesByTreeIdLazyQueryHookResult = ReturnType<typeof useGetMessagesByTreeIdLazyQuery>;
export type GetMessagesByTreeIdQueryResult = Apollo.QueryResult<GetMessagesByTreeIdQuery, GetMessagesByTreeIdQueryVariables>;
export const GetMessagesByCookieDocument = gql`
    query GetMessagesByCookie {
  getMessagesByCookie {
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
 * __useGetMessagesByCookieQuery__
 *
 * To run a query within a React component, call `useGetMessagesByCookieQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesByCookieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesByCookieQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMessagesByCookieQuery(baseOptions?: Apollo.QueryHookOptions<GetMessagesByCookieQuery, GetMessagesByCookieQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesByCookieQuery, GetMessagesByCookieQueryVariables>(GetMessagesByCookieDocument, options);
      }
export function useGetMessagesByCookieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesByCookieQuery, GetMessagesByCookieQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesByCookieQuery, GetMessagesByCookieQueryVariables>(GetMessagesByCookieDocument, options);
        }
export type GetMessagesByCookieQueryHookResult = ReturnType<typeof useGetMessagesByCookieQuery>;
export type GetMessagesByCookieLazyQueryHookResult = ReturnType<typeof useGetMessagesByCookieLazyQuery>;
export type GetMessagesByCookieQueryResult = Apollo.QueryResult<GetMessagesByCookieQuery, GetMessagesByCookieQueryVariables>;
export const GetOrgPublicInfoByIdDocument = gql`
    query GetOrgPublicInfoById($orgId: String!) {
  getOrgPublicInfoById(orgId: $orgId) {
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
 * __useGetOrgPublicInfoByIdQuery__
 *
 * To run a query within a React component, call `useGetOrgPublicInfoByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgPublicInfoByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgPublicInfoByIdQuery({
 *   variables: {
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useGetOrgPublicInfoByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrgPublicInfoByIdQuery, GetOrgPublicInfoByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgPublicInfoByIdQuery, GetOrgPublicInfoByIdQueryVariables>(GetOrgPublicInfoByIdDocument, options);
      }
export function useGetOrgPublicInfoByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgPublicInfoByIdQuery, GetOrgPublicInfoByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgPublicInfoByIdQuery, GetOrgPublicInfoByIdQueryVariables>(GetOrgPublicInfoByIdDocument, options);
        }
export type GetOrgPublicInfoByIdQueryHookResult = ReturnType<typeof useGetOrgPublicInfoByIdQuery>;
export type GetOrgPublicInfoByIdLazyQueryHookResult = ReturnType<typeof useGetOrgPublicInfoByIdLazyQuery>;
export type GetOrgPublicInfoByIdQueryResult = Apollo.QueryResult<GetOrgPublicInfoByIdQuery, GetOrgPublicInfoByIdQueryVariables>;
export const GetOrgPrivateInfoByIdAndCookieDocument = gql`
    query GetOrgPrivateInfoByIdAndCookie($orgId: String!) {
  getOrgPrivateInfoByIdAndCookie(orgId: $orgId) {
    org {
      id
      orgName
      location
      email
      phoneNumber
      avatar
      image
      description
      homePage
      members {
        id
        userName
        avatar
        description
      }
      inquiries {
        id
        content
        sentAt
        category
        inquiryStatus
        sender {
          id
          userName
          avatar
        }
        tree {
          id
        }
      }
    }
    error {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;

/**
 * __useGetOrgPrivateInfoByIdAndCookieQuery__
 *
 * To run a query within a React component, call `useGetOrgPrivateInfoByIdAndCookieQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgPrivateInfoByIdAndCookieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgPrivateInfoByIdAndCookieQuery({
 *   variables: {
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useGetOrgPrivateInfoByIdAndCookieQuery(baseOptions: Apollo.QueryHookOptions<GetOrgPrivateInfoByIdAndCookieQuery, GetOrgPrivateInfoByIdAndCookieQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgPrivateInfoByIdAndCookieQuery, GetOrgPrivateInfoByIdAndCookieQueryVariables>(GetOrgPrivateInfoByIdAndCookieDocument, options);
      }
export function useGetOrgPrivateInfoByIdAndCookieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgPrivateInfoByIdAndCookieQuery, GetOrgPrivateInfoByIdAndCookieQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgPrivateInfoByIdAndCookieQuery, GetOrgPrivateInfoByIdAndCookieQueryVariables>(GetOrgPrivateInfoByIdAndCookieDocument, options);
        }
export type GetOrgPrivateInfoByIdAndCookieQueryHookResult = ReturnType<typeof useGetOrgPrivateInfoByIdAndCookieQuery>;
export type GetOrgPrivateInfoByIdAndCookieLazyQueryHookResult = ReturnType<typeof useGetOrgPrivateInfoByIdAndCookieLazyQuery>;
export type GetOrgPrivateInfoByIdAndCookieQueryResult = Apollo.QueryResult<GetOrgPrivateInfoByIdAndCookieQuery, GetOrgPrivateInfoByIdAndCookieQueryVariables>;
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
export const GetOrgsByMemberCookieDocument = gql`
    query GetOrgsByMemberCookie {
  getOrgsByMemberCookie {
    orgs {
      ...OrgDetailPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${OrgDetailPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;

/**
 * __useGetOrgsByMemberCookieQuery__
 *
 * To run a query within a React component, call `useGetOrgsByMemberCookieQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgsByMemberCookieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgsByMemberCookieQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrgsByMemberCookieQuery(baseOptions?: Apollo.QueryHookOptions<GetOrgsByMemberCookieQuery, GetOrgsByMemberCookieQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgsByMemberCookieQuery, GetOrgsByMemberCookieQueryVariables>(GetOrgsByMemberCookieDocument, options);
      }
export function useGetOrgsByMemberCookieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgsByMemberCookieQuery, GetOrgsByMemberCookieQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgsByMemberCookieQuery, GetOrgsByMemberCookieQueryVariables>(GetOrgsByMemberCookieDocument, options);
        }
export type GetOrgsByMemberCookieQueryHookResult = ReturnType<typeof useGetOrgsByMemberCookieQuery>;
export type GetOrgsByMemberCookieLazyQueryHookResult = ReturnType<typeof useGetOrgsByMemberCookieLazyQuery>;
export type GetOrgsByMemberCookieQueryResult = Apollo.QueryResult<GetOrgsByMemberCookieQuery, GetOrgsByMemberCookieQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($userId: String!) {
  getUserById(userId: $userId) {
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
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserByCookieDocument = gql`
    query GetUserByCookie {
  getUserByCookie {
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
 * __useGetUserByCookieQuery__
 *
 * To run a query within a React component, call `useGetUserByCookieQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByCookieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByCookieQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserByCookieQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByCookieQuery, GetUserByCookieQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByCookieQuery, GetUserByCookieQueryVariables>(GetUserByCookieDocument, options);
      }
export function useGetUserByCookieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByCookieQuery, GetUserByCookieQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByCookieQuery, GetUserByCookieQueryVariables>(GetUserByCookieDocument, options);
        }
export type GetUserByCookieQueryHookResult = ReturnType<typeof useGetUserByCookieQuery>;
export type GetUserByCookieLazyQueryHookResult = ReturnType<typeof useGetUserByCookieLazyQuery>;
export type GetUserByCookieQueryResult = Apollo.QueryResult<GetUserByCookieQuery, GetUserByCookieQueryVariables>;
export const GetUserByIdWithOrgDocument = gql`
    query GetUserByIdWithOrg($userId: String!) {
  getUserByIdWithOrg(userId: $userId) {
    user {
      id
      userName
      image
      avatar
      description
      belongOrgs {
        id
        orgName
        location
        email
        phoneNumber
        image
        avatar
        description
        homePage
      }
    }
    error {
      ...RegularError
    }
  }
}
    ${RegularErrorFragmentDoc}`;

/**
 * __useGetUserByIdWithOrgQuery__
 *
 * To run a query within a React component, call `useGetUserByIdWithOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdWithOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdWithOrgQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdWithOrgQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdWithOrgQuery, GetUserByIdWithOrgQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdWithOrgQuery, GetUserByIdWithOrgQueryVariables>(GetUserByIdWithOrgDocument, options);
      }
export function useGetUserByIdWithOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdWithOrgQuery, GetUserByIdWithOrgQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdWithOrgQuery, GetUserByIdWithOrgQueryVariables>(GetUserByIdWithOrgDocument, options);
        }
export type GetUserByIdWithOrgQueryHookResult = ReturnType<typeof useGetUserByIdWithOrgQuery>;
export type GetUserByIdWithOrgLazyQueryHookResult = ReturnType<typeof useGetUserByIdWithOrgLazyQuery>;
export type GetUserByIdWithOrgQueryResult = Apollo.QueryResult<GetUserByIdWithOrgQuery, GetUserByIdWithOrgQueryVariables>;
export const GetUserPrivateInfoByCookieDocument = gql`
    query GetUserPrivateInfoByCookie {
  getUserByCookie {
    user {
      ...UserDetailPayload
    }
    error {
      ...RegularError
    }
  }
}
    ${UserDetailPayloadFragmentDoc}
${RegularErrorFragmentDoc}`;

/**
 * __useGetUserPrivateInfoByCookieQuery__
 *
 * To run a query within a React component, call `useGetUserPrivateInfoByCookieQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPrivateInfoByCookieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPrivateInfoByCookieQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserPrivateInfoByCookieQuery(baseOptions?: Apollo.QueryHookOptions<GetUserPrivateInfoByCookieQuery, GetUserPrivateInfoByCookieQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPrivateInfoByCookieQuery, GetUserPrivateInfoByCookieQueryVariables>(GetUserPrivateInfoByCookieDocument, options);
      }
export function useGetUserPrivateInfoByCookieLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPrivateInfoByCookieQuery, GetUserPrivateInfoByCookieQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPrivateInfoByCookieQuery, GetUserPrivateInfoByCookieQueryVariables>(GetUserPrivateInfoByCookieDocument, options);
        }
export type GetUserPrivateInfoByCookieQueryHookResult = ReturnType<typeof useGetUserPrivateInfoByCookieQuery>;
export type GetUserPrivateInfoByCookieLazyQueryHookResult = ReturnType<typeof useGetUserPrivateInfoByCookieLazyQuery>;
export type GetUserPrivateInfoByCookieQueryResult = Apollo.QueryResult<GetUserPrivateInfoByCookieQuery, GetUserPrivateInfoByCookieQueryVariables>;
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