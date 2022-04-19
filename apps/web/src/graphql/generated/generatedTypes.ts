import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** APPLICATION | CONTACT | COUNSEL | INQUIRY | OTHERS */
  InquiryCategory: string;
  /** DONE | DRAFT | UNREAD | WORKING */
  InquiryStatus: string;
  /** SENT | READ | UNREAD | DRAFT */
  MessageStatus: string;
  /** VISITOR | CLIENT | EXPERT */
  UserRole: string;
};

export type Address = {
  __typename?: 'Address';
  address: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type ApplicationError = Error & {
  __typename?: 'ApplicationError';
  message: Scalars['String'];
};

export type Base = Node & {
  __typename?: 'Base';
  dialogs?: Maybe<DialogConnection>;
  fellows?: Maybe<FellowConnection>;
  id: Scalars['ID'];
  karte?: Maybe<Karte>;
};

export type BaseResult = Base | Errors;

export type BoolResult = Errors | Succeeded;

export type Dialog = Node & {
  __typename?: 'Dialog';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DialogConnection = {
  __typename?: 'DialogConnection';
  edges?: Maybe<Array<DialogEdges>>;
  pageInfo?: Maybe<PageInfo>;
};

export type DialogEdges = {
  __typename?: 'DialogEdges';
  cursor: Scalars['String'];
  node: Dialog;
};

export type DialogResult = Dialog | Errors;

export type Dialogs = {
  __typename?: 'Dialogs';
  dialogs?: Maybe<Array<Dialog>>;
};

export type DialogsResult = Dialogs | Errors;

export type Error = {
  message: Scalars['String'];
};

export type Errors = {
  __typename?: 'Errors';
  applicationError?: Maybe<ApplicationError>;
  userError?: Maybe<UserError>;
};

export type FellowConnection = {
  __typename?: 'FellowConnection';
  edges?: Maybe<Array<FellowEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type FellowEdge = {
  __typename?: 'FellowEdge';
  cursor: Scalars['String'];
  isBaseAdmin?: Maybe<Scalars['Boolean']>;
  node: User;
};

export type Hoge = {
  __typename?: 'Hoge';
  id: Scalars['ID'];
};

export type InquiriesResult = Errors | InquiryConnection;

export type Inquiry = Node & {
  __typename?: 'Inquiry';
  category?: Maybe<Scalars['InquiryCategory']>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inquiryStatus?: Maybe<Scalars['InquiryStatus']>;
  receivedOrg?: Maybe<Org>;
  replier?: Maybe<User>;
  sender?: Maybe<User>;
  sentAt?: Maybe<Scalars['String']>;
};

export type InquiryConnection = {
  __typename?: 'InquiryConnection';
  edges?: Maybe<Array<InquiryEdges>>;
  pageInfo?: Maybe<PageInfo>;
};

export type InquiryEdges = {
  __typename?: 'InquiryEdges';
  cursor: Scalars['String'];
  node: Inquiry;
};

export type InquiryLeafConnection = {
  __typename?: 'InquiryLeafConnection';
  edges: Array<Maybe<InquiryLeafEdges>>;
  pageInfo?: Maybe<PageInfo>;
};

export type InquiryLeafEdges = {
  __typename?: 'InquiryLeafEdges';
  cursor: Scalars['String'];
  isRoot?: Maybe<Scalars['Boolean']>;
  node: Inquiry;
};

export type InquiryResult = Errors | Inquiry;

export type InquiryTree = Node & {
  __typename?: 'InquiryTree';
  id: Scalars['ID'];
  leaves?: Maybe<InquiryLeafConnection>;
};

export type InquiryTreeResult = Errors | InquiryTree;

export type Karte = Node & {
  __typename?: 'Karte';
  id: Scalars['ID'];
};

export type KarteResult = Errors | Karte;

export type MemberConnection = {
  __typename?: 'MemberConnection';
  edges?: Maybe<Array<MemberEdges>>;
  pageInfo?: Maybe<PageInfo>;
};

export type MemberEdges = {
  __typename?: 'MemberEdges';
  cursor: Scalars['String'];
  isAdmin?: Maybe<Scalars['Boolean']>;
  node: User;
};

export type Message = Node & {
  __typename?: 'Message';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  receiver?: Maybe<User>;
  sender?: Maybe<User>;
  sentAt?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['MessageStatus']>;
};

export type MessageConnection = {
  __typename?: 'MessageConnection';
  edges?: Maybe<Array<MessageEdges>>;
  pageInfo?: Maybe<PageInfo>;
};

export type MessageEdges = {
  __typename?: 'MessageEdges';
  cursor: Scalars['String'];
  node: Message;
};

export type MessageLeafConnection = {
  __typename?: 'MessageLeafConnection';
  edges?: Maybe<Array<MessageLeafEdges>>;
  pageInfo?: Maybe<PageInfo>;
};

export type MessageLeafEdges = {
  __typename?: 'MessageLeafEdges';
  cursor: Scalars['String'];
  isRoot?: Maybe<Scalars['Boolean']>;
  node: Message;
};

export type MessageResult = Errors | Message;

export type MessageTree = Node & {
  __typename?: 'MessageTree';
  id: Scalars['ID'];
  leaves?: Maybe<MessageLeafConnection>;
};

export type MessageTreeResult = Errors | MessageTree;

export type Messages = {
  __typename?: 'Messages';
  messages?: Maybe<Array<Message>>;
};

export type MessagesResult = Errors | Messages;

export type Mutation = {
  __typename?: 'Mutation';
  acceptJoinOrg?: Maybe<OrgResult>;
  changePassword?: Maybe<BoolResult>;
  createBase?: Maybe<BaseResult>;
  deleteUser?: Maybe<BoolResult>;
  forgetPassword?: Maybe<BoolResult>;
  loginUser?: Maybe<UserResult>;
  logoutUser?: Maybe<BoolResult>;
  postDialog?: Maybe<PostDialogResult>;
  registerOrg?: Maybe<OrgResult>;
  registerUser?: Maybe<UserResult>;
  replyInquiry?: Maybe<InquiryResult>;
  replyMessage?: Maybe<MessageResult>;
  requestJoinOrg?: Maybe<OrgResult>;
  sendInquiry?: Maybe<InquiryResult>;
  sendMessage?: Maybe<MessageResult>;
  updateInquiryStatus?: Maybe<InquiryResult>;
  updateOrg?: Maybe<OrgResult>;
  updateUser?: Maybe<UserResult>;
};


export type MutationAcceptJoinOrgArgs = {
  input: AcceptJoinOrgInput;
};


export type MutationChangePasswordArgs = {
  input?: InputMaybe<ChangePasswordInput>;
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationPostDialogArgs = {
  input: PostDialogInput;
};


export type MutationRegisterOrgArgs = {
  input: RegisterOrgInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationReplyInquiryArgs = {
  input: ReplyInquiryInput;
};


export type MutationReplyMessageArgs = {
  input: ReplyMessageInput;
};


export type MutationRequestJoinOrgArgs = {
  orgId: Scalars['String'];
};


export type MutationSendInquiryArgs = {
  input: SendInquiryInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationUpdateInquiryStatusArgs = {
  input: UpdateInquiryStatusInput;
};


export type MutationUpdateOrgArgs = {
  input: UpdateOrgInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type Org = Node & {
  __typename?: 'Org';
  address?: Maybe<Address>;
  avatarUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  heroImageUrl?: Maybe<Scalars['String']>;
  homePage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inquiries?: Maybe<InquiryConnection>;
  members?: Maybe<MemberConnection>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type OrgResult = Errors | Org;

export type Orgs = {
  __typename?: 'Orgs';
  orgs?: Maybe<Array<Org>>;
};

export type OrgsResult = Errors | Orgs;

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNext: Scalars['Boolean'];
  hasPrevious: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PostDialogResult = Dialog | Errors;

export type Query = {
  __typename?: 'Query';
  getBase?: Maybe<BaseResult>;
  getDialogsByBaseId?: Maybe<DialogsResult>;
  getInquiriesByOrgId?: Maybe<InquiriesResult>;
  getInquiriesByTreeId?: Maybe<InquiryTreeResult>;
  getInquiry?: Maybe<InquiryResult>;
  getKarte?: Maybe<KarteResult>;
  getMessagesByCookie?: Maybe<MessagesResult>;
  getMessagesByTreeId?: Maybe<MessageTreeResult>;
  getOrg?: Maybe<OrgResult>;
  getOrgInfoByMemberCookieAndId?: Maybe<OrgResult>;
  getOrgs?: Maybe<OrgsResult>;
  getUserByCookie?: Maybe<UserResult>;
  getUserById?: Maybe<UserResult>;
  getUsers?: Maybe<UsersResult>;
  hoge?: Maybe<Hoge>;
  node?: Maybe<Node>;
  nodes?: Maybe<Array<Maybe<Node>>>;
};


export type QueryGetBaseArgs = {
  id: Scalars['String'];
};


export type QueryGetDialogsByBaseIdArgs = {
  id: Scalars['String'];
};


export type QueryGetInquiriesByOrgIdArgs = {
  orgId: Scalars['String'];
};


export type QueryGetInquiriesByTreeIdArgs = {
  treeId: Scalars['String'];
};


export type QueryGetInquiryArgs = {
  inquiryId: Scalars['String'];
};


export type QueryGetKarteArgs = {
  id: Scalars['String'];
};


export type QueryGetMessagesByTreeIdArgs = {
  treeId: Scalars['String'];
};


export type QueryGetOrgArgs = {
  id: Scalars['String'];
};


export type QueryGetOrgInfoByMemberCookieAndIdArgs = {
  orgId: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryHogeArgs = {
  id: Scalars['ID'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};

export type RegisterOrgInput = {
  address: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type SendInquiryInput = {
  category: Scalars['InquiryCategory'];
  content: Scalars['String'];
  orgId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  dialogPosted?: Maybe<Dialog>;
};

export type Succeeded = {
  __typename?: 'Succeeded';
  succeeded: Scalars['String'];
};

export type UpdateInquiryStatusInput = {
  inquiryId: Scalars['ID'];
  inquiryStatus: Scalars['InquiryStatus'];
};

export type UpdateOrgInput = {
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  homePage?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  orgId: Scalars['ID'];
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type User = Node & {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  heroImageUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  messages?: Maybe<MessageConnection>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['UserRole']>;
  selfIntro?: Maybe<Scalars['String']>;
};

export type UserError = Error & {
  __typename?: 'UserError';
  message: Scalars['String'];
};

export type UserResult = Errors | User;

export type Users = {
  __typename?: 'Users';
  users?: Maybe<Array<User>>;
};

export type UsersResult = Errors | Users;

export type AcceptJoinOrgInput = {
  requestUserId: Scalars['String'];
  requestedOrgId: Scalars['String'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type PostDialogInput = {
  content: Scalars['String'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ReplyInquiryInput = {
  content: Scalars['String'];
  replyTargetId: Scalars['String'];
};

export type ReplyMessageInput = {
  content: Scalars['String'];
  replyTargetId: Scalars['String'];
};

export type SendMessageInput = {
  content: Scalars['String'];
  receiverId: Scalars['String'];
};

export type UpdateUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  heroImageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  selfIntro?: InputMaybe<Scalars['String']>;
};

export type MessageLeafConnFragment = { __typename?: 'MessageLeafConnection', edges?: Array<{ __typename?: 'MessageLeafEdges', cursor: string, isRoot?: boolean | null, node: { __typename?: 'Message', id: string, content?: string | null, sentAt?: string | null, status?: string | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null };

export type ErrorsFragment = { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null };

export type OrgExceptConnFragment = { __typename?: 'Org', avatarUrl?: string | null, description?: string | null, email?: string | null, heroImageUrl?: string | null, homePage?: string | null, id: string, name?: string | null, phoneNumber?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null };

export type OrgPrivateInfoFragment = { __typename?: 'Org', id: string, name?: string | null, email?: string | null, phoneNumber?: string | null, description?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, homePage?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, inquiries?: { __typename?: 'InquiryConnection', edges?: Array<{ __typename?: 'InquiryEdges', cursor: string, node: { __typename?: 'Inquiry', category?: string | null, content?: string | null, id: string, inquiryStatus?: string | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, sender?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null, replier?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, isAdmin?: boolean | null, node: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } }> | null } | null };

export type OrgPublicInfoFragment = { __typename?: 'Org', id: string, name?: string | null, description?: string | null, email?: string | null, phoneNumber?: string | null, homePage?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, node: { __typename?: 'User', id: string, name?: string | null, selfIntro?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null };

export type PageInfosFragment = { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null };

export type UserPrivateInfoFragment = { __typename?: 'User', id: string, name?: string | null, email?: string | null, selfIntro?: string | null, role?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, messages?: { __typename?: 'MessageConnection', edges?: Array<{ __typename?: 'MessageEdges', cursor: string, node: { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: string | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean } | null } | null };

export type UserPublicInfoFragment = { __typename?: 'User', id: string, name?: string | null, selfIntro?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null };

export type ChangeUserPasswordMutationVariables = Exact<{
  input?: InputMaybe<ChangePasswordInput>;
}>;


export type ChangeUserPasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Succeeded', succeeded: string } | null };

export type ForgetUserPasswordMutationVariables = Exact<{
  forgetPasswordEmail: Scalars['String'];
}>;


export type ForgetUserPasswordMutation = { __typename?: 'Mutation', forgetPassword?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Succeeded', succeeded: string } | null };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'User', id: string, name?: string | null, email?: string | null, selfIntro?: string | null, role?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, messages?: { __typename?: 'MessageConnection', edges?: Array<{ __typename?: 'MessageEdges', cursor: string, node: { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: string | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean } | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'User', id: string, name?: string | null, email?: string | null, selfIntro?: string | null, role?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, messages?: { __typename?: 'MessageConnection', edges?: Array<{ __typename?: 'MessageEdges', cursor: string, node: { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: string | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean } | null } | null } | null };

export type GetOrgPrivateInfoByCookieAndIdQueryVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type GetOrgPrivateInfoByCookieAndIdQuery = { __typename?: 'Query', getOrgInfoByMemberCookieAndId?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Org', id: string, name?: string | null, email?: string | null, phoneNumber?: string | null, description?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, homePage?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, inquiries?: { __typename?: 'InquiryConnection', edges?: Array<{ __typename?: 'InquiryEdges', cursor: string, node: { __typename?: 'Inquiry', category?: string | null, content?: string | null, id: string, inquiryStatus?: string | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, sender?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null, replier?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, isAdmin?: boolean | null, node: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } }> | null } | null } | null };

export type GetOrgPublicInfoByIdQueryVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type GetOrgPublicInfoByIdQuery = { __typename?: 'Query', getOrg?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Org', id: string, name?: string | null, description?: string | null, email?: string | null, phoneNumber?: string | null, homePage?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, node: { __typename?: 'User', id: string, name?: string | null, selfIntro?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null } | null };

export type GetOrgsForMapQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrgsForMapQuery = { __typename?: 'Query', getOrgs?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Orgs', orgs?: Array<{ __typename?: 'Org', avatarUrl?: string | null, description?: string | null, email?: string | null, heroImageUrl?: string | null, homePage?: string | null, id: string, name?: string | null, phoneNumber?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null }> | null } | null };

export type GetMessagesByTreeIdQueryVariables = Exact<{
  treeId: Scalars['String'];
}>;


export type GetMessagesByTreeIdQuery = { __typename?: 'Query', getMessagesByTreeId?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'MessageTree', id: string, leaves?: { __typename?: 'MessageLeafConnection', edges?: Array<{ __typename?: 'MessageLeafEdges', cursor: string, isRoot?: boolean | null, node: { __typename?: 'Message', id: string, content?: string | null, sentAt?: string | null, status?: string | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null } | null };

export type GetMessagesByCookieQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMessagesByCookieQuery = { __typename?: 'Query', getMessagesByCookie?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Messages', messages?: Array<{ __typename?: 'Message', id: string, content?: string | null, sentAt?: string | null, status?: string | null, receiver?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null, sender?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null }> | null } | null };

export type GetUserMyInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserMyInfoQuery = { __typename?: 'Query', getUserByCookie?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'User', id: string, name?: string | null, email?: string | null, selfIntro?: string | null, role?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, messages?: { __typename?: 'MessageConnection', edges?: Array<{ __typename?: 'MessageEdges', cursor: string, node: { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: string | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean } | null } | null } | null };

export type GetUserPublicInfoQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserPublicInfoQuery = { __typename?: 'Query', getUserById?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'User', id: string, name?: string | null, selfIntro?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null } | null };

export const PageInfosFragmentDoc = gql`
    fragment PageInfos on PageInfo {
  endCursor
  hasNext
  hasPrevious
  startCursor
}
    `;
export const MessageLeafConnFragmentDoc = gql`
    fragment MessageLeafConn on MessageLeafConnection {
  edges {
    cursor
    isRoot
    node {
      id
      content
      sentAt
      status
      receiver {
        id
      }
      sender {
        id
      }
    }
  }
  pageInfo {
    ...PageInfos
  }
}
    ${PageInfosFragmentDoc}`;
export const ErrorsFragmentDoc = gql`
    fragment Errors on Errors {
  applicationError {
    message
  }
  userError {
    message
  }
}
    `;
export const OrgExceptConnFragmentDoc = gql`
    fragment OrgExceptConn on Org {
  address {
    address
    latitude
    longitude
  }
  avatarUrl
  description
  email
  heroImageUrl
  homePage
  id
  name
  phoneNumber
}
    `;
export const OrgPrivateInfoFragmentDoc = gql`
    fragment OrgPrivateInfo on Org {
  id
  name
  email
  phoneNumber
  description
  avatarUrl
  heroImageUrl
  homePage
  address {
    address
    latitude
    longitude
  }
  inquiries {
    edges {
      cursor
      node {
        category
        content
        id
        inquiryStatus
        receivedOrg {
          id
        }
        sender {
          id
          name
          avatarUrl
        }
        replier {
          id
          name
          avatarUrl
        }
        sentAt
      }
    }
    pageInfo {
      endCursor
      hasNext
      hasPrevious
      startCursor
    }
  }
  members {
    edges {
      cursor
      isAdmin
      node {
        id
        name
        avatarUrl
      }
    }
  }
}
    `;
export const OrgPublicInfoFragmentDoc = gql`
    fragment OrgPublicInfo on Org {
  id
  name
  description
  email
  phoneNumber
  homePage
  avatarUrl
  heroImageUrl
  address {
    address
    latitude
    longitude
  }
  members {
    edges {
      cursor
      node {
        id
        name
        selfIntro
        avatarUrl
        heroImageUrl
      }
    }
    pageInfo {
      ...PageInfos
    }
  }
}
    ${PageInfosFragmentDoc}`;
export const UserPrivateInfoFragmentDoc = gql`
    fragment UserPrivateInfo on User {
  id
  name
  email
  selfIntro
  role
  avatarUrl
  heroImageUrl
  messages {
    edges {
      cursor
      node {
        content
        id
        receiver {
          id
        }
        sender {
          id
        }
        sentAt
        status
      }
    }
    pageInfo {
      hasNext
      hasPrevious
    }
  }
}
    `;
export const UserPublicInfoFragmentDoc = gql`
    fragment UserPublicInfo on User {
  id
  name
  selfIntro
  avatarUrl
  heroImageUrl
}
    `;
export const ChangeUserPasswordDocument = gql`
    mutation ChangeUserPassword($input: changePasswordInput) {
  changePassword(input: $input) {
    ... on Errors {
      ...Errors
    }
    ... on Succeeded {
      succeeded
    }
  }
}
    ${ErrorsFragmentDoc}`;
export type ChangeUserPasswordMutationFn = Apollo.MutationFunction<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>;

/**
 * __useChangeUserPasswordMutation__
 *
 * To run a mutation, you first call `useChangeUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserPasswordMutation, { data, loading, error }] = useChangeUserPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>(ChangeUserPasswordDocument, options);
      }
export type ChangeUserPasswordMutationHookResult = ReturnType<typeof useChangeUserPasswordMutation>;
export type ChangeUserPasswordMutationResult = Apollo.MutationResult<ChangeUserPasswordMutation>;
export type ChangeUserPasswordMutationOptions = Apollo.BaseMutationOptions<ChangeUserPasswordMutation, ChangeUserPasswordMutationVariables>;
export const ForgetUserPasswordDocument = gql`
    mutation ForgetUserPassword($forgetPasswordEmail: String!) {
  forgetPassword(email: $forgetPasswordEmail) {
    ... on Errors {
      ...Errors
    }
    ... on Succeeded {
      succeeded
    }
  }
}
    ${ErrorsFragmentDoc}`;
export type ForgetUserPasswordMutationFn = Apollo.MutationFunction<ForgetUserPasswordMutation, ForgetUserPasswordMutationVariables>;

/**
 * __useForgetUserPasswordMutation__
 *
 * To run a mutation, you first call `useForgetUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgetUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgetUserPasswordMutation, { data, loading, error }] = useForgetUserPasswordMutation({
 *   variables: {
 *      forgetPasswordEmail: // value for 'forgetPasswordEmail'
 *   },
 * });
 */
export function useForgetUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgetUserPasswordMutation, ForgetUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgetUserPasswordMutation, ForgetUserPasswordMutationVariables>(ForgetUserPasswordDocument, options);
      }
export type ForgetUserPasswordMutationHookResult = ReturnType<typeof useForgetUserPasswordMutation>;
export type ForgetUserPasswordMutationResult = Apollo.MutationResult<ForgetUserPasswordMutation>;
export type ForgetUserPasswordMutationOptions = Apollo.BaseMutationOptions<ForgetUserPasswordMutation, ForgetUserPasswordMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($input: loginUserInput!) {
  loginUser(input: $input) {
    ... on User {
      ...UserPrivateInfo
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${UserPrivateInfoFragmentDoc}
${ErrorsFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: updateUserInput!) {
  updateUser(input: $input) {
    ... on User {
      ...UserPrivateInfo
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${UserPrivateInfoFragmentDoc}
${ErrorsFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const GetOrgPrivateInfoByCookieAndIdDocument = gql`
    query GetOrgPrivateInfoByCookieAndId($orgId: String!) {
  getOrgInfoByMemberCookieAndId(orgId: $orgId) {
    ... on Org {
      ...OrgPrivateInfo
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${OrgPrivateInfoFragmentDoc}
${ErrorsFragmentDoc}`;

/**
 * __useGetOrgPrivateInfoByCookieAndIdQuery__
 *
 * To run a query within a React component, call `useGetOrgPrivateInfoByCookieAndIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgPrivateInfoByCookieAndIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgPrivateInfoByCookieAndIdQuery({
 *   variables: {
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useGetOrgPrivateInfoByCookieAndIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrgPrivateInfoByCookieAndIdQuery, GetOrgPrivateInfoByCookieAndIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgPrivateInfoByCookieAndIdQuery, GetOrgPrivateInfoByCookieAndIdQueryVariables>(GetOrgPrivateInfoByCookieAndIdDocument, options);
      }
export function useGetOrgPrivateInfoByCookieAndIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgPrivateInfoByCookieAndIdQuery, GetOrgPrivateInfoByCookieAndIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgPrivateInfoByCookieAndIdQuery, GetOrgPrivateInfoByCookieAndIdQueryVariables>(GetOrgPrivateInfoByCookieAndIdDocument, options);
        }
export type GetOrgPrivateInfoByCookieAndIdQueryHookResult = ReturnType<typeof useGetOrgPrivateInfoByCookieAndIdQuery>;
export type GetOrgPrivateInfoByCookieAndIdLazyQueryHookResult = ReturnType<typeof useGetOrgPrivateInfoByCookieAndIdLazyQuery>;
export type GetOrgPrivateInfoByCookieAndIdQueryResult = Apollo.QueryResult<GetOrgPrivateInfoByCookieAndIdQuery, GetOrgPrivateInfoByCookieAndIdQueryVariables>;
export const GetOrgPublicInfoByIdDocument = gql`
    query GetOrgPublicInfoById($orgId: String!) {
  getOrg(id: $orgId) {
    ... on Org {
      ...OrgPublicInfo
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${OrgPublicInfoFragmentDoc}
${ErrorsFragmentDoc}`;

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
export const GetOrgsForMapDocument = gql`
    query GetOrgsForMap {
  getOrgs {
    ... on Orgs {
      orgs {
        ...OrgExceptConn
      }
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${OrgExceptConnFragmentDoc}
${ErrorsFragmentDoc}`;

/**
 * __useGetOrgsForMapQuery__
 *
 * To run a query within a React component, call `useGetOrgsForMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgsForMapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgsForMapQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrgsForMapQuery(baseOptions?: Apollo.QueryHookOptions<GetOrgsForMapQuery, GetOrgsForMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgsForMapQuery, GetOrgsForMapQueryVariables>(GetOrgsForMapDocument, options);
      }
export function useGetOrgsForMapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgsForMapQuery, GetOrgsForMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgsForMapQuery, GetOrgsForMapQueryVariables>(GetOrgsForMapDocument, options);
        }
export type GetOrgsForMapQueryHookResult = ReturnType<typeof useGetOrgsForMapQuery>;
export type GetOrgsForMapLazyQueryHookResult = ReturnType<typeof useGetOrgsForMapLazyQuery>;
export type GetOrgsForMapQueryResult = Apollo.QueryResult<GetOrgsForMapQuery, GetOrgsForMapQueryVariables>;
export const GetMessagesByTreeIdDocument = gql`
    query GetMessagesByTreeId($treeId: String!) {
  getMessagesByTreeId(treeId: $treeId) {
    ... on MessageTree {
      id
      leaves {
        ...MessageLeafConn
      }
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${MessageLeafConnFragmentDoc}
${ErrorsFragmentDoc}`;

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
    ... on Messages {
      messages {
        id
        content
        receiver {
          id
          name
          avatarUrl
        }
        sender {
          id
          name
          avatarUrl
        }
        sentAt
        status
      }
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${ErrorsFragmentDoc}`;

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
export const GetUserMyInfoDocument = gql`
    query GetUserMyInfo {
  getUserByCookie {
    ... on User {
      ...UserPrivateInfo
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${UserPrivateInfoFragmentDoc}
${ErrorsFragmentDoc}`;

/**
 * __useGetUserMyInfoQuery__
 *
 * To run a query within a React component, call `useGetUserMyInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserMyInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserMyInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserMyInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserMyInfoQuery, GetUserMyInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserMyInfoQuery, GetUserMyInfoQueryVariables>(GetUserMyInfoDocument, options);
      }
export function useGetUserMyInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserMyInfoQuery, GetUserMyInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserMyInfoQuery, GetUserMyInfoQueryVariables>(GetUserMyInfoDocument, options);
        }
export type GetUserMyInfoQueryHookResult = ReturnType<typeof useGetUserMyInfoQuery>;
export type GetUserMyInfoLazyQueryHookResult = ReturnType<typeof useGetUserMyInfoLazyQuery>;
export type GetUserMyInfoQueryResult = Apollo.QueryResult<GetUserMyInfoQuery, GetUserMyInfoQueryVariables>;
export const GetUserPublicInfoDocument = gql`
    query GetUserPublicInfo($userId: String!) {
  getUserById(userId: $userId) {
    ... on User {
      ...UserPublicInfo
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${UserPublicInfoFragmentDoc}
${ErrorsFragmentDoc}`;

/**
 * __useGetUserPublicInfoQuery__
 *
 * To run a query within a React component, call `useGetUserPublicInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPublicInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPublicInfoQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserPublicInfoQuery(baseOptions: Apollo.QueryHookOptions<GetUserPublicInfoQuery, GetUserPublicInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPublicInfoQuery, GetUserPublicInfoQueryVariables>(GetUserPublicInfoDocument, options);
      }
export function useGetUserPublicInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPublicInfoQuery, GetUserPublicInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPublicInfoQuery, GetUserPublicInfoQueryVariables>(GetUserPublicInfoDocument, options);
        }
export type GetUserPublicInfoQueryHookResult = ReturnType<typeof useGetUserPublicInfoQuery>;
export type GetUserPublicInfoLazyQueryHookResult = ReturnType<typeof useGetUserPublicInfoLazyQuery>;
export type GetUserPublicInfoQueryResult = Apollo.QueryResult<GetUserPublicInfoQuery, GetUserPublicInfoQueryVariables>;