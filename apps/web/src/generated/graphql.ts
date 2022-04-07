import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export type Base = Node & {
  __typename?: 'Base';
  baseOwner?: Maybe<User>;
  id: Scalars['ID'];
  members?: Maybe<Array<Maybe<User>>>;
};

export type BasePayload = {
  __typename?: 'BasePayload';
  base?: Maybe<Base>;
  error?: Maybe<RegularError>;
};

export type Dialog = Node & {
  __typename?: 'Dialog';
  base?: Maybe<Base>;
  dialogContent?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DialogPayload = {
  __typename?: 'DialogPayload';
  dialog?: Maybe<Array<Maybe<Dialog>>>;
  error?: Maybe<RegularError>;
};

export type Hoge = {
  __typename?: 'Hoge';
  id: Scalars['ID'];
};

export type Inquiry = Node & {
  __typename?: 'Inquiry';
  category?: Maybe<InquiryCategory>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inquiryStatus?: Maybe<InquiryStatus>;
  sender?: Maybe<User>;
  sentAt?: Maybe<Scalars['String']>;
  tree?: Maybe<InquiryTree>;
};

export enum InquiryCategory {
  Application = 'APPLICATION',
  Contact = 'CONTACT',
  Counsel = 'COUNSEL',
  Inquiry = 'INQUIRY',
  Others = 'OTHERS'
}

export type InquiryPayload = {
  __typename?: 'InquiryPayload';
  error?: Maybe<RegularError>;
  inquiries?: Maybe<Array<Maybe<Inquiry>>>;
  inquiry?: Maybe<Inquiry>;
  inquiryTree?: Maybe<InquiryTree>;
  pageInfo?: Maybe<PageInfo>;
};

export enum InquiryStatus {
  Done = 'DONE',
  Draft = 'DRAFT',
  Unread = 'UNREAD',
  Working = 'WORKING'
}

export type InquiryTree = Node & {
  __typename?: 'InquiryTree';
  id: Scalars['ID'];
  treedInquiry?: Maybe<Array<Maybe<Inquiry>>>;
};

export type Message = Node & {
  __typename?: 'Message';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  messageStatus?: Maybe<MessageStatus>;
  receiver?: Maybe<User>;
  sender?: Maybe<User>;
  sentAt?: Maybe<Scalars['String']>;
  tree?: Maybe<MessageTree>;
};

export type MessagePayload = {
  __typename?: 'MessagePayload';
  error?: Maybe<RegularError>;
  message?: Maybe<Message>;
  messageTree?: Maybe<MessageTree>;
  messages?: Maybe<Array<Maybe<Message>>>;
  pageInfo?: Maybe<PageInfo>;
};

export enum MessageStatus {
  Draft = 'DRAFT',
  Read = 'READ',
  Unread = 'UNREAD'
}

export type MessageTree = Node & {
  __typename?: 'MessageTree';
  id: Scalars['ID'];
  treedMessage?: Maybe<Array<Maybe<Message>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptJoinOrg?: Maybe<OrgPayload>;
  changePassword?: Maybe<RegularPayload>;
  deleteUser?: Maybe<RegularPayload>;
  forgetPassword?: Maybe<RegularPayload>;
  login?: Maybe<UserPayload>;
  logout?: Maybe<RegularPayload>;
  postDialog?: Maybe<DialogPayload>;
  registerOrg?: Maybe<OrgPayload>;
  registerUser: RegisterUserPayload;
  replyInquiry?: Maybe<InquiryPayload>;
  replyMessage?: Maybe<MessagePayload>;
  requestJoinOrg?: Maybe<OrgPayload>;
  sendInquiry?: Maybe<InquiryPayload>;
  sendMessage?: Maybe<MessagePayload>;
  updateInquiryStatus?: Maybe<InquiryPayload>;
  updateOrg?: Maybe<OrgPayload>;
  updateUser?: Maybe<UserPayload>;
};


export type MutationAcceptJoinOrgArgs = {
  requestUserId: Scalars['String'];
  requestedOrgId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  currentPass: Scalars['String'];
  newPass: Scalars['String'];
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationPostDialogArgs = {
  dialogContent: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRegisterOrgArgs = {
  email: Scalars['String'];
  location: Scalars['String'];
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationReplyInquiryArgs = {
  content: Scalars['String'];
  replyTargetId: Scalars['String'];
};


export type MutationReplyMessageArgs = {
  content: Scalars['String'];
  replyTargetId: Scalars['String'];
};


export type MutationRequestJoinOrgArgs = {
  orgId: Scalars['String'];
};


export type MutationSendInquiryArgs = {
  category?: InputMaybe<InquiryCategory>;
  orgId: Scalars['String'];
  receiverId: Scalars['String'];
  status?: InputMaybe<InquiryStatus>;
  textInput: Scalars['String'];
};


export type MutationSendMessageArgs = {
  receiverId: Scalars['String'];
  textInput: Scalars['String'];
};


export type MutationUpdateInquiryStatusArgs = {
  inquiryId: Scalars['String'];
  inquiryStatus: InquiryStatus;
};


export type MutationUpdateOrgArgs = {
  input?: InputMaybe<OrgUpdateInput>;
  orgId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  userName?: InputMaybe<Scalars['String']>;
};

export type Node = {
  id: Scalars['ID'];
};

export type Org = Node & {
  __typename?: 'Org';
  avatar?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  homePage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  inquiries?: Maybe<Array<Maybe<Inquiry>>>;
  latitude?: Maybe<Scalars['Float']>;
  location?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['Float']>;
  members?: Maybe<Array<Maybe<User>>>;
  orgName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type OrgPayload = {
  __typename?: 'OrgPayload';
  error?: Maybe<RegularError>;
  org?: Maybe<Org>;
  orgs?: Maybe<Array<Maybe<Org>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type OrgUpdateInput = {
  adminId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  homePage?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  orgName?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasMore?: Maybe<Scalars['Boolean']>;
  limit?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getInquiriesByTreeIdAndCookie?: Maybe<InquiryPayload>;
  getInquiriesWithStatus?: Maybe<InquiryPayload>;
  getInquiry?: Maybe<InquiryPayload>;
  getMessagesByCookie?: Maybe<MessagePayload>;
  getMessagesByTreeId?: Maybe<MessagePayload>;
  getOrgPrivateInfoByIdAndCookie?: Maybe<OrgPayload>;
  getOrgPublicInfoById?: Maybe<OrgPayload>;
  getOrgs?: Maybe<OrgPayload>;
  getOrgsByMemberCookie?: Maybe<OrgPayload>;
  getUserByCookie?: Maybe<UserPayload>;
  getUserById?: Maybe<UserPayload>;
  getUserByIdWithOrg?: Maybe<UserPayload>;
  getUsers: UserPayload;
  hoge?: Maybe<Hoge>;
  node?: Maybe<Node>;
  nodes?: Maybe<Array<Maybe<Node>>>;
};


export type QueryGetInquiriesByTreeIdAndCookieArgs = {
  treeId: Scalars['String'];
};


export type QueryGetInquiriesWithStatusArgs = {
  endCursor?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  orgId: Scalars['String'];
  status?: InputMaybe<InquiryStatus>;
};


export type QueryGetInquiryArgs = {
  inquiryId: Scalars['String'];
};


export type QueryGetMessagesByTreeIdArgs = {
  treeId: Scalars['String'];
};


export type QueryGetOrgPrivateInfoByIdAndCookieArgs = {
  orgId: Scalars['String'];
};


export type QueryGetOrgPublicInfoByIdArgs = {
  orgId: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryGetUserByIdWithOrgArgs = {
  userId: Scalars['String'];
};


export type QueryHogeArgs = {
  id: Scalars['ID'];
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};

export type RegisterUserPayload = {
  __typename?: 'RegisterUserPayload';
  user: User;
};

export type RegularError = {
  __typename?: 'RegularError';
  invalidField?: Maybe<Array<Scalars['String']>>;
  message: Scalars['String'];
};

export type RegularPayload = {
  __typename?: 'RegularPayload';
  message?: Maybe<Scalars['String']>;
  result?: Maybe<Scalars['Boolean']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  dialogPosted?: Maybe<Dialog>;
};

export type User = Node & {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  belongBases?: Maybe<Array<Base>>;
  belongOrgs?: Maybe<Array<Org>>;
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  heroImage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  messages?: Maybe<Array<Message>>;
  name: Scalars['String'];
  role?: Maybe<UserRole>;
  selfIntro?: Maybe<Scalars['String']>;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  error?: Maybe<RegularError>;
  pageInfo?: Maybe<PageInfo>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export enum UserRole {
  Client = 'CLIENT',
  Expert = 'EXPERT',
  Visitor = 'VISITOR'
}

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};
