import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FileModel, UserRoleModel, MessageStatusModel, InquiryCategoryModel, InquiryStatusModel } from '\@kurakichi/modules/shared/infra/graphql/MappingModels';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** APPLICATION | CONTACT | COUNSEL | INQUIRY | OTHERS */
  InquiryCategory: InquiryCategoryModel;
  /** DONE | DRAFT | UNREAD | WORKING */
  InquiryStatus: InquiryStatusModel;
  /** SENT | READ | UNREAD | DRAFT */
  MessageStatus: MessageStatusModel;
  Upload: FileModel;
  /** VISITOR | CLIENT | EXPERT */
  UserRole: UserRoleModel;
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

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
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
  uploadFile: File;
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


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
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

export type OrgConnection = {
  __typename?: 'OrgConnection';
  edges?: Maybe<Array<OrgEdges>>;
  pageInfo?: Maybe<PageInfo>;
};

export type OrgEdges = {
  __typename?: 'OrgEdges';
  cursor: Scalars['String'];
  node: Org;
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
  orgs?: Maybe<OrgConnection>;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  ApplicationError: ResolverTypeWrapper<ApplicationError>;
  Base: ResolverTypeWrapper<Base>;
  BaseResult: ResolversTypes['Base'] | ResolversTypes['Errors'];
  BoolResult: ResolversTypes['Errors'] | ResolversTypes['Succeeded'];
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Dialog: ResolverTypeWrapper<Dialog>;
  DialogConnection: ResolverTypeWrapper<DialogConnection>;
  DialogEdges: ResolverTypeWrapper<DialogEdges>;
  DialogResult: ResolversTypes['Dialog'] | ResolversTypes['Errors'];
  Dialogs: ResolverTypeWrapper<Dialogs>;
  DialogsResult: ResolversTypes['Dialogs'] | ResolversTypes['Errors'];
  Error: ResolversTypes['ApplicationError'] | ResolversTypes['UserError'];
  Errors: ResolverTypeWrapper<Errors>;
  FellowConnection: ResolverTypeWrapper<FellowConnection>;
  FellowEdge: ResolverTypeWrapper<FellowEdge>;
  File: ResolverTypeWrapper<File>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InquiriesResult: ResolversTypes['Errors'] | ResolversTypes['InquiryConnection'];
  Inquiry: ResolverTypeWrapper<Omit<Inquiry, 'category' | 'inquiryStatus'> & { category?: Maybe<ResolversTypes['InquiryCategory']>, inquiryStatus?: Maybe<ResolversTypes['InquiryStatus']> }>;
  InquiryCategory: ResolverTypeWrapper<InquiryCategoryModel>;
  InquiryConnection: ResolverTypeWrapper<InquiryConnection>;
  InquiryEdges: ResolverTypeWrapper<InquiryEdges>;
  InquiryLeafConnection: ResolverTypeWrapper<InquiryLeafConnection>;
  InquiryLeafEdges: ResolverTypeWrapper<InquiryLeafEdges>;
  InquiryResult: ResolversTypes['Errors'] | ResolversTypes['Inquiry'];
  InquiryStatus: ResolverTypeWrapper<InquiryStatusModel>;
  InquiryTree: ResolverTypeWrapper<InquiryTree>;
  InquiryTreeResult: ResolversTypes['Errors'] | ResolversTypes['InquiryTree'];
  Karte: ResolverTypeWrapper<Karte>;
  KarteResult: ResolversTypes['Errors'] | ResolversTypes['Karte'];
  MemberConnection: ResolverTypeWrapper<MemberConnection>;
  MemberEdges: ResolverTypeWrapper<MemberEdges>;
  Message: ResolverTypeWrapper<Omit<Message, 'status'> & { status?: Maybe<ResolversTypes['MessageStatus']> }>;
  MessageConnection: ResolverTypeWrapper<MessageConnection>;
  MessageEdges: ResolverTypeWrapper<MessageEdges>;
  MessageLeafConnection: ResolverTypeWrapper<MessageLeafConnection>;
  MessageLeafEdges: ResolverTypeWrapper<MessageLeafEdges>;
  MessageResult: ResolversTypes['Errors'] | ResolversTypes['Message'];
  MessageStatus: ResolverTypeWrapper<MessageStatusModel>;
  MessageTree: ResolverTypeWrapper<MessageTree>;
  MessageTreeResult: ResolversTypes['Errors'] | ResolversTypes['MessageTree'];
  Messages: ResolverTypeWrapper<Messages>;
  MessagesResult: ResolversTypes['Errors'] | ResolversTypes['Messages'];
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Base'] | ResolversTypes['Dialog'] | ResolversTypes['Inquiry'] | ResolversTypes['InquiryTree'] | ResolversTypes['Karte'] | ResolversTypes['Message'] | ResolversTypes['MessageTree'] | ResolversTypes['Org'] | ResolversTypes['User'];
  Org: ResolverTypeWrapper<Org>;
  OrgConnection: ResolverTypeWrapper<OrgConnection>;
  OrgEdges: ResolverTypeWrapper<OrgEdges>;
  OrgResult: ResolversTypes['Errors'] | ResolversTypes['Org'];
  Orgs: ResolverTypeWrapper<Orgs>;
  OrgsResult: ResolversTypes['Errors'] | ResolversTypes['Orgs'];
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PostDialogResult: ResolversTypes['Dialog'] | ResolversTypes['Errors'];
  Query: ResolverTypeWrapper<{}>;
  RegisterOrgInput: RegisterOrgInput;
  SendInquiryInput: SendInquiryInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Succeeded: ResolverTypeWrapper<Succeeded>;
  UpdateInquiryStatusInput: UpdateInquiryStatusInput;
  UpdateOrgInput: UpdateOrgInput;
  Upload: ResolverTypeWrapper<FileModel>;
  User: ResolverTypeWrapper<Omit<User, 'role'> & { role?: Maybe<ResolversTypes['UserRole']> }>;
  UserError: ResolverTypeWrapper<UserError>;
  UserResult: ResolversTypes['Errors'] | ResolversTypes['User'];
  UserRole: ResolverTypeWrapper<UserRoleModel>;
  Users: ResolverTypeWrapper<Users>;
  UsersResult: ResolversTypes['Errors'] | ResolversTypes['Users'];
  acceptJoinOrgInput: AcceptJoinOrgInput;
  changePasswordInput: ChangePasswordInput;
  loginUserInput: LoginUserInput;
  postDialogInput: PostDialogInput;
  registerUserInput: RegisterUserInput;
  replyInquiryInput: ReplyInquiryInput;
  replyMessageInput: ReplyMessageInput;
  sendMessageInput: SendMessageInput;
  updateUserInput: UpdateUserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  ApplicationError: ApplicationError;
  Base: Base;
  BaseResult: ResolversParentTypes['Base'] | ResolversParentTypes['Errors'];
  BoolResult: ResolversParentTypes['Errors'] | ResolversParentTypes['Succeeded'];
  Boolean: Scalars['Boolean'];
  Dialog: Dialog;
  DialogConnection: DialogConnection;
  DialogEdges: DialogEdges;
  DialogResult: ResolversParentTypes['Dialog'] | ResolversParentTypes['Errors'];
  Dialogs: Dialogs;
  DialogsResult: ResolversParentTypes['Dialogs'] | ResolversParentTypes['Errors'];
  Error: ResolversParentTypes['ApplicationError'] | ResolversParentTypes['UserError'];
  Errors: Errors;
  FellowConnection: FellowConnection;
  FellowEdge: FellowEdge;
  File: File;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  InquiriesResult: ResolversParentTypes['Errors'] | ResolversParentTypes['InquiryConnection'];
  Inquiry: Omit<Inquiry, 'category' | 'inquiryStatus'> & { category?: Maybe<ResolversParentTypes['InquiryCategory']>, inquiryStatus?: Maybe<ResolversParentTypes['InquiryStatus']> };
  InquiryCategory: InquiryCategoryModel;
  InquiryConnection: InquiryConnection;
  InquiryEdges: InquiryEdges;
  InquiryLeafConnection: InquiryLeafConnection;
  InquiryLeafEdges: InquiryLeafEdges;
  InquiryResult: ResolversParentTypes['Errors'] | ResolversParentTypes['Inquiry'];
  InquiryStatus: InquiryStatusModel;
  InquiryTree: InquiryTree;
  InquiryTreeResult: ResolversParentTypes['Errors'] | ResolversParentTypes['InquiryTree'];
  Karte: Karte;
  KarteResult: ResolversParentTypes['Errors'] | ResolversParentTypes['Karte'];
  MemberConnection: MemberConnection;
  MemberEdges: MemberEdges;
  Message: Omit<Message, 'status'> & { status?: Maybe<ResolversParentTypes['MessageStatus']> };
  MessageConnection: MessageConnection;
  MessageEdges: MessageEdges;
  MessageLeafConnection: MessageLeafConnection;
  MessageLeafEdges: MessageLeafEdges;
  MessageResult: ResolversParentTypes['Errors'] | ResolversParentTypes['Message'];
  MessageStatus: MessageStatusModel;
  MessageTree: MessageTree;
  MessageTreeResult: ResolversParentTypes['Errors'] | ResolversParentTypes['MessageTree'];
  Messages: Messages;
  MessagesResult: ResolversParentTypes['Errors'] | ResolversParentTypes['Messages'];
  Mutation: {};
  Node: ResolversParentTypes['Base'] | ResolversParentTypes['Dialog'] | ResolversParentTypes['Inquiry'] | ResolversParentTypes['InquiryTree'] | ResolversParentTypes['Karte'] | ResolversParentTypes['Message'] | ResolversParentTypes['MessageTree'] | ResolversParentTypes['Org'] | ResolversParentTypes['User'];
  Org: Org;
  OrgConnection: OrgConnection;
  OrgEdges: OrgEdges;
  OrgResult: ResolversParentTypes['Errors'] | ResolversParentTypes['Org'];
  Orgs: Orgs;
  OrgsResult: ResolversParentTypes['Errors'] | ResolversParentTypes['Orgs'];
  PageInfo: PageInfo;
  PostDialogResult: ResolversParentTypes['Dialog'] | ResolversParentTypes['Errors'];
  Query: {};
  RegisterOrgInput: RegisterOrgInput;
  SendInquiryInput: SendInquiryInput;
  String: Scalars['String'];
  Subscription: {};
  Succeeded: Succeeded;
  UpdateInquiryStatusInput: UpdateInquiryStatusInput;
  UpdateOrgInput: UpdateOrgInput;
  Upload: FileModel;
  User: Omit<User, 'role'> & { role?: Maybe<ResolversParentTypes['UserRole']> };
  UserError: UserError;
  UserResult: ResolversParentTypes['Errors'] | ResolversParentTypes['User'];
  UserRole: UserRoleModel;
  Users: Users;
  UsersResult: ResolversParentTypes['Errors'] | ResolversParentTypes['Users'];
  acceptJoinOrgInput: AcceptJoinOrgInput;
  changePasswordInput: ChangePasswordInput;
  loginUserInput: LoginUserInput;
  postDialogInput: PostDialogInput;
  registerUserInput: RegisterUserInput;
  replyInquiryInput: ReplyInquiryInput;
  replyMessageInput: ReplyMessageInput;
  sendMessageInput: SendMessageInput;
  updateUserInput: UpdateUserInput;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ApplicationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApplicationError'] = ResolversParentTypes['ApplicationError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Base'] = ResolversParentTypes['Base']> = {
  dialogs?: Resolver<Maybe<ResolversTypes['DialogConnection']>, ParentType, ContextType>;
  fellows?: Resolver<Maybe<ResolversTypes['FellowConnection']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  karte?: Resolver<Maybe<ResolversTypes['Karte']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BaseResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseResult'] = ResolversParentTypes['BaseResult']> = {
  __resolveType: TypeResolveFn<'Base' | 'Errors', ParentType, ContextType>;
};

export type BoolResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoolResult'] = ResolversParentTypes['BoolResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'Succeeded', ParentType, ContextType>;
};

export type DialogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dialog'] = ResolversParentTypes['Dialog']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DialogConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogConnection'] = ResolversParentTypes['DialogConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['DialogEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DialogEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogEdges'] = ResolversParentTypes['DialogEdges']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Dialog'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DialogResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogResult'] = ResolversParentTypes['DialogResult']> = {
  __resolveType: TypeResolveFn<'Dialog' | 'Errors', ParentType, ContextType>;
};

export type DialogsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dialogs'] = ResolversParentTypes['Dialogs']> = {
  dialogs?: Resolver<Maybe<Array<ResolversTypes['Dialog']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DialogsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogsResult'] = ResolversParentTypes['DialogsResult']> = {
  __resolveType: TypeResolveFn<'Dialogs' | 'Errors', ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  __resolveType: TypeResolveFn<'ApplicationError' | 'UserError', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ErrorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Errors'] = ResolversParentTypes['Errors']> = {
  applicationError?: Resolver<Maybe<ResolversTypes['ApplicationError']>, ParentType, ContextType>;
  userError?: Resolver<Maybe<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FellowConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FellowConnection'] = ResolversParentTypes['FellowConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['FellowEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FellowEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FellowEdge'] = ResolversParentTypes['FellowEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isBaseAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InquiriesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiriesResult'] = ResolversParentTypes['InquiriesResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'InquiryConnection', ParentType, ContextType>;
};

export type InquiryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Inquiry'] = ResolversParentTypes['Inquiry']> = {
  category?: Resolver<Maybe<ResolversTypes['InquiryCategory']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inquiryStatus?: Resolver<Maybe<ResolversTypes['InquiryStatus']>, ParentType, ContextType>;
  receivedOrg?: Resolver<Maybe<ResolversTypes['Org']>, ParentType, ContextType>;
  replier?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface InquiryCategoryScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['InquiryCategory'], any> {
  name: 'InquiryCategory';
}

export type InquiryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryConnection'] = ResolversParentTypes['InquiryConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['InquiryEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InquiryEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryEdges'] = ResolversParentTypes['InquiryEdges']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Inquiry'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InquiryLeafConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryLeafConnection'] = ResolversParentTypes['InquiryLeafConnection']> = {
  edges?: Resolver<Array<Maybe<ResolversTypes['InquiryLeafEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InquiryLeafEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryLeafEdges'] = ResolversParentTypes['InquiryLeafEdges']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isRoot?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Inquiry'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InquiryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryResult'] = ResolversParentTypes['InquiryResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'Inquiry', ParentType, ContextType>;
};

export interface InquiryStatusScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['InquiryStatus'], any> {
  name: 'InquiryStatus';
}

export type InquiryTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryTree'] = ResolversParentTypes['InquiryTree']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  leaves?: Resolver<Maybe<ResolversTypes['InquiryLeafConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InquiryTreeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryTreeResult'] = ResolversParentTypes['InquiryTreeResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'InquiryTree', ParentType, ContextType>;
};

export type KarteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Karte'] = ResolversParentTypes['Karte']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KarteResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['KarteResult'] = ResolversParentTypes['KarteResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'Karte', ParentType, ContextType>;
};

export type MemberConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberConnection'] = ResolversParentTypes['MemberConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['MemberEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemberEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberEdges'] = ResolversParentTypes['MemberEdges']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  receiver?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['MessageStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageConnection'] = ResolversParentTypes['MessageConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['MessageEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageEdges'] = ResolversParentTypes['MessageEdges']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageLeafConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageLeafConnection'] = ResolversParentTypes['MessageLeafConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['MessageLeafEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageLeafEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageLeafEdges'] = ResolversParentTypes['MessageLeafEdges']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isRoot?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageResult'] = ResolversParentTypes['MessageResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'Message', ParentType, ContextType>;
};

export interface MessageStatusScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MessageStatus'], any> {
  name: 'MessageStatus';
}

export type MessageTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageTree'] = ResolversParentTypes['MessageTree']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  leaves?: Resolver<Maybe<ResolversTypes['MessageLeafConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageTreeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageTreeResult'] = ResolversParentTypes['MessageTreeResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'MessageTree', ParentType, ContextType>;
};

export type MessagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Messages'] = ResolversParentTypes['Messages']> = {
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessagesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessagesResult'] = ResolversParentTypes['MessagesResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'Messages', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptJoinOrg?: Resolver<Maybe<ResolversTypes['OrgResult']>, ParentType, ContextType, RequireFields<MutationAcceptJoinOrgArgs, 'input'>>;
  changePassword?: Resolver<Maybe<ResolversTypes['BoolResult']>, ParentType, ContextType, Partial<MutationChangePasswordArgs>>;
  createBase?: Resolver<Maybe<ResolversTypes['BaseResult']>, ParentType, ContextType>;
  deleteUser?: Resolver<Maybe<ResolversTypes['BoolResult']>, ParentType, ContextType>;
  forgetPassword?: Resolver<Maybe<ResolversTypes['BoolResult']>, ParentType, ContextType, RequireFields<MutationForgetPasswordArgs, 'email'>>;
  loginUser?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  logoutUser?: Resolver<Maybe<ResolversTypes['BoolResult']>, ParentType, ContextType>;
  postDialog?: Resolver<Maybe<ResolversTypes['PostDialogResult']>, ParentType, ContextType, RequireFields<MutationPostDialogArgs, 'input'>>;
  registerOrg?: Resolver<Maybe<ResolversTypes['OrgResult']>, ParentType, ContextType, RequireFields<MutationRegisterOrgArgs, 'input'>>;
  registerUser?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  replyInquiry?: Resolver<Maybe<ResolversTypes['InquiryResult']>, ParentType, ContextType, RequireFields<MutationReplyInquiryArgs, 'input'>>;
  replyMessage?: Resolver<Maybe<ResolversTypes['MessageResult']>, ParentType, ContextType, RequireFields<MutationReplyMessageArgs, 'input'>>;
  requestJoinOrg?: Resolver<Maybe<ResolversTypes['OrgResult']>, ParentType, ContextType, RequireFields<MutationRequestJoinOrgArgs, 'orgId'>>;
  sendInquiry?: Resolver<Maybe<ResolversTypes['InquiryResult']>, ParentType, ContextType, RequireFields<MutationSendInquiryArgs, 'input'>>;
  sendMessage?: Resolver<Maybe<ResolversTypes['MessageResult']>, ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'input'>>;
  updateInquiryStatus?: Resolver<Maybe<ResolversTypes['InquiryResult']>, ParentType, ContextType, RequireFields<MutationUpdateInquiryStatusArgs, 'input'>>;
  updateOrg?: Resolver<Maybe<ResolversTypes['OrgResult']>, ParentType, ContextType, RequireFields<MutationUpdateOrgArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  uploadFile?: Resolver<ResolversTypes['File'], ParentType, ContextType, RequireFields<MutationUploadFileArgs, 'file'>>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Base' | 'Dialog' | 'Inquiry' | 'InquiryTree' | 'Karte' | 'Message' | 'MessageTree' | 'Org' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type OrgResolvers<ContextType = any, ParentType extends ResolversParentTypes['Org'] = ResolversParentTypes['Org']> = {
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  heroImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  homePage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inquiries?: Resolver<Maybe<ResolversTypes['InquiryConnection']>, ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['MemberConnection']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrgConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgConnection'] = ResolversParentTypes['OrgConnection']> = {
  edges?: Resolver<Maybe<Array<ResolversTypes['OrgEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrgEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgEdges'] = ResolversParentTypes['OrgEdges']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Org'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrgResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgResult'] = ResolversParentTypes['OrgResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'Org', ParentType, ContextType>;
};

export type OrgsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Orgs'] = ResolversParentTypes['Orgs']> = {
  orgs?: Resolver<Maybe<Array<ResolversTypes['Org']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrgsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgsResult'] = ResolversParentTypes['OrgsResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'Orgs', ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNext?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPrevious?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostDialogResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostDialogResult'] = ResolversParentTypes['PostDialogResult']> = {
  __resolveType: TypeResolveFn<'Dialog' | 'Errors', ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBase?: Resolver<Maybe<ResolversTypes['BaseResult']>, ParentType, ContextType, RequireFields<QueryGetBaseArgs, 'id'>>;
  getDialogsByBaseId?: Resolver<Maybe<ResolversTypes['DialogsResult']>, ParentType, ContextType, RequireFields<QueryGetDialogsByBaseIdArgs, 'id'>>;
  getInquiriesByOrgId?: Resolver<Maybe<ResolversTypes['InquiriesResult']>, ParentType, ContextType, RequireFields<QueryGetInquiriesByOrgIdArgs, 'orgId'>>;
  getInquiriesByTreeId?: Resolver<Maybe<ResolversTypes['InquiryTreeResult']>, ParentType, ContextType, RequireFields<QueryGetInquiriesByTreeIdArgs, 'treeId'>>;
  getInquiry?: Resolver<Maybe<ResolversTypes['InquiryResult']>, ParentType, ContextType, RequireFields<QueryGetInquiryArgs, 'inquiryId'>>;
  getKarte?: Resolver<Maybe<ResolversTypes['KarteResult']>, ParentType, ContextType, RequireFields<QueryGetKarteArgs, 'id'>>;
  getMessagesByCookie?: Resolver<Maybe<ResolversTypes['MessagesResult']>, ParentType, ContextType>;
  getMessagesByTreeId?: Resolver<Maybe<ResolversTypes['MessageTreeResult']>, ParentType, ContextType, RequireFields<QueryGetMessagesByTreeIdArgs, 'treeId'>>;
  getOrg?: Resolver<Maybe<ResolversTypes['OrgResult']>, ParentType, ContextType, RequireFields<QueryGetOrgArgs, 'id'>>;
  getOrgInfoByMemberCookieAndId?: Resolver<Maybe<ResolversTypes['OrgResult']>, ParentType, ContextType, RequireFields<QueryGetOrgInfoByMemberCookieAndIdArgs, 'orgId'>>;
  getOrgs?: Resolver<Maybe<ResolversTypes['OrgsResult']>, ParentType, ContextType>;
  getUserByCookie?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType>;
  getUserById?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'userId'>>;
  getUsers?: Resolver<Maybe<ResolversTypes['UsersResult']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Node']>>>, ParentType, ContextType, RequireFields<QueryNodesArgs, 'ids'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  dialogPosted?: SubscriptionResolver<Maybe<ResolversTypes['Dialog']>, "dialogPosted", ParentType, ContextType>;
};

export type SucceededResolvers<ContextType = any, ParentType extends ResolversParentTypes['Succeeded'] = ResolversParentTypes['Succeeded']> = {
  succeeded?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  heroImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Maybe<ResolversTypes['MessageConnection']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orgs?: Resolver<Maybe<ResolversTypes['OrgConnection']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  selfIntro?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserError'] = ResolversParentTypes['UserError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'User', ParentType, ContextType>;
};

export interface UserRoleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UserRole'], any> {
  name: 'UserRole';
}

export type UsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Users'] = ResolversParentTypes['Users']> = {
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersResult'] = ResolversParentTypes['UsersResult']> = {
  __resolveType: TypeResolveFn<'Errors' | 'Users', ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  ApplicationError?: ApplicationErrorResolvers<ContextType>;
  Base?: BaseResolvers<ContextType>;
  BaseResult?: BaseResultResolvers<ContextType>;
  BoolResult?: BoolResultResolvers<ContextType>;
  Dialog?: DialogResolvers<ContextType>;
  DialogConnection?: DialogConnectionResolvers<ContextType>;
  DialogEdges?: DialogEdgesResolvers<ContextType>;
  DialogResult?: DialogResultResolvers<ContextType>;
  Dialogs?: DialogsResolvers<ContextType>;
  DialogsResult?: DialogsResultResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  Errors?: ErrorsResolvers<ContextType>;
  FellowConnection?: FellowConnectionResolvers<ContextType>;
  FellowEdge?: FellowEdgeResolvers<ContextType>;
  File?: FileResolvers<ContextType>;
  InquiriesResult?: InquiriesResultResolvers<ContextType>;
  Inquiry?: InquiryResolvers<ContextType>;
  InquiryCategory?: GraphQLScalarType;
  InquiryConnection?: InquiryConnectionResolvers<ContextType>;
  InquiryEdges?: InquiryEdgesResolvers<ContextType>;
  InquiryLeafConnection?: InquiryLeafConnectionResolvers<ContextType>;
  InquiryLeafEdges?: InquiryLeafEdgesResolvers<ContextType>;
  InquiryResult?: InquiryResultResolvers<ContextType>;
  InquiryStatus?: GraphQLScalarType;
  InquiryTree?: InquiryTreeResolvers<ContextType>;
  InquiryTreeResult?: InquiryTreeResultResolvers<ContextType>;
  Karte?: KarteResolvers<ContextType>;
  KarteResult?: KarteResultResolvers<ContextType>;
  MemberConnection?: MemberConnectionResolvers<ContextType>;
  MemberEdges?: MemberEdgesResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageConnection?: MessageConnectionResolvers<ContextType>;
  MessageEdges?: MessageEdgesResolvers<ContextType>;
  MessageLeafConnection?: MessageLeafConnectionResolvers<ContextType>;
  MessageLeafEdges?: MessageLeafEdgesResolvers<ContextType>;
  MessageResult?: MessageResultResolvers<ContextType>;
  MessageStatus?: GraphQLScalarType;
  MessageTree?: MessageTreeResolvers<ContextType>;
  MessageTreeResult?: MessageTreeResultResolvers<ContextType>;
  Messages?: MessagesResolvers<ContextType>;
  MessagesResult?: MessagesResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Org?: OrgResolvers<ContextType>;
  OrgConnection?: OrgConnectionResolvers<ContextType>;
  OrgEdges?: OrgEdgesResolvers<ContextType>;
  OrgResult?: OrgResultResolvers<ContextType>;
  Orgs?: OrgsResolvers<ContextType>;
  OrgsResult?: OrgsResultResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PostDialogResult?: PostDialogResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Succeeded?: SucceededResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserError?: UserErrorResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
  UserRole?: GraphQLScalarType;
  Users?: UsersResolvers<ContextType>;
  UsersResult?: UsersResultResolvers<ContextType>;
};


export type InquiryConnectionFragment = { __typename?: 'InquiryConnection', edges?: Array<{ __typename?: 'InquiryEdges', cursor: string, node: { __typename?: 'Inquiry', id: string, content?: string | null, category?: InquiryCategoryModel | null, inquiryStatus?: InquiryStatusModel | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, replier?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null };

export type MessageLeafConnectionFragment = { __typename?: 'MessageLeafConnection', edges?: Array<{ __typename?: 'MessageLeafEdges', cursor: string, isRoot?: boolean | null, node: { __typename?: 'Message', id: string, content?: string | null, sentAt?: string | null, status?: MessageStatusModel | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null };

export type ErrorsFragment = { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null };

export type OrgExceptConnectionFragment = { __typename?: 'Org', avatarUrl?: string | null, description?: string | null, email?: string | null, heroImageUrl?: string | null, homePage?: string | null, id: string, name?: string | null, phoneNumber?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null };

export type OrgPrivateInfoFragment = { __typename?: 'Org', id: string, name?: string | null, email?: string | null, phoneNumber?: string | null, description?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, homePage?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, inquiries?: { __typename?: 'InquiryConnection', edges?: Array<{ __typename?: 'InquiryEdges', cursor: string, node: { __typename?: 'Inquiry', category?: InquiryCategoryModel | null, content?: string | null, id: string, inquiryStatus?: InquiryStatusModel | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, sender?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null, replier?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, isAdmin?: boolean | null, node: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } }> | null } | null };

export type OrgPublicInfoFragment = { __typename?: 'Org', id: string, name?: string | null, description?: string | null, email?: string | null, phoneNumber?: string | null, homePage?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, node: { __typename?: 'User', id: string, name?: string | null, selfIntro?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null };

export type PageInfoFragment = { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null };

export type UserPrivateInfoFragment = { __typename?: 'User', id: string, name?: string | null, email?: string | null, selfIntro?: string | null, role?: UserRoleModel | null, avatarUrl?: string | null, heroImageUrl?: string | null, messages?: { __typename?: 'MessageConnection', edges?: Array<{ __typename?: 'MessageEdges', cursor: string, node: { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: MessageStatusModel | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean } | null } | null, orgs?: { __typename?: 'OrgConnection', edges?: Array<{ __typename?: 'OrgEdges', cursor: string, node: { __typename?: 'Org', id: string, name?: string | null } }> | null } | null };

export type UserPublicInfoFragment = { __typename?: 'User', id: string, name?: string | null, selfIntro?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null };

export type AcceptToJoinOrgMutationVariables = Exact<{
  input: AcceptJoinOrgInput;
}>;


export type AcceptToJoinOrgMutation = { __typename?: 'Mutation', acceptJoinOrg?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Org', id: string, name?: string | null, email?: string | null, phoneNumber?: string | null, description?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, homePage?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, inquiries?: { __typename?: 'InquiryConnection', edges?: Array<{ __typename?: 'InquiryEdges', cursor: string, node: { __typename?: 'Inquiry', category?: InquiryCategoryModel | null, content?: string | null, id: string, inquiryStatus?: InquiryStatusModel | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, sender?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null, replier?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, isAdmin?: boolean | null, node: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } }> | null } | null } | null };

export type RegisterOrgMutationVariables = Exact<{
  input: RegisterOrgInput;
}>;


export type RegisterOrgMutation = { __typename?: 'Mutation', registerOrg?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Org', id: string, name?: string | null, email?: string | null, phoneNumber?: string | null, description?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, homePage?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, inquiries?: { __typename?: 'InquiryConnection', edges?: Array<{ __typename?: 'InquiryEdges', cursor: string, node: { __typename?: 'Inquiry', category?: InquiryCategoryModel | null, content?: string | null, id: string, inquiryStatus?: InquiryStatusModel | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, sender?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null, replier?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, isAdmin?: boolean | null, node: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } }> | null } | null } | null };

export type ReplyInquiryMutationVariables = Exact<{
  input: ReplyInquiryInput;
}>;


export type ReplyInquiryMutation = { __typename?: 'Mutation', replyInquiry?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Inquiry', category?: InquiryCategoryModel | null, content?: string | null, id: string, inquiryStatus?: InquiryStatusModel | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, replier?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } | null };

export type SendInquiryMutationVariables = Exact<{
  input: SendInquiryInput;
}>;


export type SendInquiryMutation = { __typename?: 'Mutation', sendInquiry?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Inquiry', category?: InquiryCategoryModel | null, content?: string | null, id: string, inquiryStatus?: InquiryStatusModel | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, replier?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } | null };

export type UpdateInquiryStatusMutationVariables = Exact<{
  input: UpdateInquiryStatusInput;
}>;


export type UpdateInquiryStatusMutation = { __typename?: 'Mutation', updateInquiryStatus?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Inquiry', category?: InquiryCategoryModel | null, content?: string | null, id: string, inquiryStatus?: InquiryStatusModel | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, replier?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } | null };

export type UpdateOrgInfoMutationVariables = Exact<{
  input: UpdateOrgInput;
}>;


export type UpdateOrgInfoMutation = { __typename?: 'Mutation', updateOrg?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Org', id: string, name?: string | null, email?: string | null, phoneNumber?: string | null, description?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, homePage?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, inquiries?: { __typename?: 'InquiryConnection', edges?: Array<{ __typename?: 'InquiryEdges', cursor: string, node: { __typename?: 'Inquiry', category?: InquiryCategoryModel | null, content?: string | null, id: string, inquiryStatus?: InquiryStatusModel | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, sender?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null, replier?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, isAdmin?: boolean | null, node: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } }> | null } | null } | null };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'File', encoding: string, filename: string, mimetype: string } };

export type ChangeUserPasswordMutationVariables = Exact<{
  input?: InputMaybe<ChangePasswordInput>;
}>;


export type ChangeUserPasswordMutation = { __typename?: 'Mutation', changePassword?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Succeeded', succeeded: string } | null };

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Succeeded', succeeded: string } | null };

export type ForgetUserPasswordMutationVariables = Exact<{
  forgetPasswordEmail: Scalars['String'];
}>;


export type ForgetUserPasswordMutation = { __typename?: 'Mutation', forgetPassword?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Succeeded', succeeded: string } | null };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'User', id: string, name?: string | null, email?: string | null, selfIntro?: string | null, role?: UserRoleModel | null, avatarUrl?: string | null, heroImageUrl?: string | null, messages?: { __typename?: 'MessageConnection', edges?: Array<{ __typename?: 'MessageEdges', cursor: string, node: { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: MessageStatusModel | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean } | null } | null, orgs?: { __typename?: 'OrgConnection', edges?: Array<{ __typename?: 'OrgEdges', cursor: string, node: { __typename?: 'Org', id: string, name?: string | null } }> | null } | null } | null };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Succeeded', succeeded: string } | null };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'User', id: string, name?: string | null, email?: string | null, selfIntro?: string | null, role?: UserRoleModel | null, avatarUrl?: string | null, heroImageUrl?: string | null, messages?: { __typename?: 'MessageConnection', edges?: Array<{ __typename?: 'MessageEdges', cursor: string, node: { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: MessageStatusModel | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean } | null } | null, orgs?: { __typename?: 'OrgConnection', edges?: Array<{ __typename?: 'OrgEdges', cursor: string, node: { __typename?: 'Org', id: string, name?: string | null } }> | null } | null } | null };

export type ReplyMessageMutationVariables = Exact<{
  input: ReplyMessageInput;
}>;


export type ReplyMessageMutation = { __typename?: 'Mutation', replyMessage?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: MessageStatusModel | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } | null };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: MessageStatusModel | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'User', id: string, name?: string | null, email?: string | null, selfIntro?: string | null, role?: UserRoleModel | null, avatarUrl?: string | null, heroImageUrl?: string | null, messages?: { __typename?: 'MessageConnection', edges?: Array<{ __typename?: 'MessageEdges', cursor: string, node: { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: MessageStatusModel | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean } | null } | null, orgs?: { __typename?: 'OrgConnection', edges?: Array<{ __typename?: 'OrgEdges', cursor: string, node: { __typename?: 'Org', id: string, name?: string | null } }> | null } | null } | null };

export type GetInquiriesByOrgIdQueryVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type GetInquiriesByOrgIdQuery = { __typename?: 'Query', getInquiriesByOrgId?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'InquiryConnection', edges?: Array<{ __typename?: 'InquiryEdges', cursor: string, node: { __typename?: 'Inquiry', id: string, content?: string | null, category?: InquiryCategoryModel | null, inquiryStatus?: InquiryStatusModel | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, replier?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null };

export type GetOrgPrivateInfoByCookieAndIdQueryVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type GetOrgPrivateInfoByCookieAndIdQuery = { __typename?: 'Query', getOrgInfoByMemberCookieAndId?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Org', id: string, name?: string | null, email?: string | null, phoneNumber?: string | null, description?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, homePage?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, inquiries?: { __typename?: 'InquiryConnection', edges?: Array<{ __typename?: 'InquiryEdges', cursor: string, node: { __typename?: 'Inquiry', category?: InquiryCategoryModel | null, content?: string | null, id: string, inquiryStatus?: InquiryStatusModel | null, sentAt?: string | null, receivedOrg?: { __typename?: 'Org', id: string } | null, sender?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null, replier?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, isAdmin?: boolean | null, node: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } }> | null } | null } | null };

export type GetOrgPublicInfoByIdQueryVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type GetOrgPublicInfoByIdQuery = { __typename?: 'Query', getOrg?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Org', id: string, name?: string | null, description?: string | null, email?: string | null, phoneNumber?: string | null, homePage?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null, members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdges', cursor: string, node: { __typename?: 'User', id: string, name?: string | null, selfIntro?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null } | null };

export type GetOrgsForMapQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrgsForMapQuery = { __typename?: 'Query', getOrgs?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Orgs', orgs?: Array<{ __typename?: 'Org', avatarUrl?: string | null, description?: string | null, email?: string | null, heroImageUrl?: string | null, homePage?: string | null, id: string, name?: string | null, phoneNumber?: string | null, address?: { __typename?: 'Address', address: string, latitude: number, longitude: number } | null }> | null } | null };

export type GetMessagesByTreeIdQueryVariables = Exact<{
  treeId: Scalars['String'];
}>;


export type GetMessagesByTreeIdQuery = { __typename?: 'Query', getMessagesByTreeId?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'MessageTree', id: string, leaves?: { __typename?: 'MessageLeafConnection', edges?: Array<{ __typename?: 'MessageLeafEdges', cursor: string, isRoot?: boolean | null, node: { __typename?: 'Message', id: string, content?: string | null, sentAt?: string | null, status?: MessageStatusModel | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null, hasNext: boolean, hasPrevious: boolean, startCursor?: string | null } | null } | null } | null };

export type GetMessagesByCookieQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMessagesByCookieQuery = { __typename?: 'Query', getMessagesByCookie?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'Messages', messages?: Array<{ __typename?: 'Message', id: string, content?: string | null, sentAt?: string | null, status?: MessageStatusModel | null, receiver?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null, sender?: { __typename?: 'User', id: string, name?: string | null, avatarUrl?: string | null } | null }> | null } | null };

export type GetUserMyInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserMyInfoQuery = { __typename?: 'Query', getUserByCookie?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'User', id: string, name?: string | null, email?: string | null, selfIntro?: string | null, role?: UserRoleModel | null, avatarUrl?: string | null, heroImageUrl?: string | null, messages?: { __typename?: 'MessageConnection', edges?: Array<{ __typename?: 'MessageEdges', cursor: string, node: { __typename?: 'Message', content?: string | null, id: string, sentAt?: string | null, status?: MessageStatusModel | null, receiver?: { __typename?: 'User', id: string } | null, sender?: { __typename?: 'User', id: string } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasNext: boolean, hasPrevious: boolean } | null } | null, orgs?: { __typename?: 'OrgConnection', edges?: Array<{ __typename?: 'OrgEdges', cursor: string, node: { __typename?: 'Org', id: string, name?: string | null } }> | null } | null } | null };

export type GetUserPublicInfoQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetUserPublicInfoQuery = { __typename?: 'Query', getUserById?: { __typename?: 'Errors', applicationError?: { __typename?: 'ApplicationError', message: string } | null, userError?: { __typename?: 'UserError', message: string } | null } | { __typename?: 'User', id: string, name?: string | null, selfIntro?: string | null, avatarUrl?: string | null, heroImageUrl?: string | null } | null };

export type DialogPostedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type DialogPostedSubscription = { __typename?: 'Subscription', dialogPosted?: { __typename?: 'Dialog', id: string, content?: string | null } | null };

export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
  endCursor
  hasNext
  hasPrevious
  startCursor
}
    `;
export const InquiryConnectionFragmentDoc = gql`
    fragment InquiryConnection on InquiryConnection {
  edges {
    cursor
    node {
      id
      content
      category
      inquiryStatus
      sentAt
      receivedOrg {
        id
      }
      replier {
        id
      }
      sender {
        id
      }
    }
  }
  pageInfo {
    ...PageInfo
  }
}
    ${PageInfoFragmentDoc}`;
export const MessageLeafConnectionFragmentDoc = gql`
    fragment MessageLeafConnection on MessageLeafConnection {
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
    ...PageInfo
  }
}
    ${PageInfoFragmentDoc}`;
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
export const OrgExceptConnectionFragmentDoc = gql`
    fragment OrgExceptConnection on Org {
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
      ...PageInfo
    }
  }
}
    ${PageInfoFragmentDoc}`;
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
  orgs {
    edges {
      cursor
      node {
        id
        name
      }
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
export const AcceptToJoinOrgDocument = gql`
    mutation AcceptToJoinOrg($input: acceptJoinOrgInput!) {
  acceptJoinOrg(input: $input) {
    ... on Errors {
      ...Errors
    }
    ... on Org {
      ...OrgPrivateInfo
    }
  }
}
    ${ErrorsFragmentDoc}
${OrgPrivateInfoFragmentDoc}`;
export type AcceptToJoinOrgMutationFn = Apollo.MutationFunction<AcceptToJoinOrgMutation, AcceptToJoinOrgMutationVariables>;

/**
 * __useAcceptToJoinOrgMutation__
 *
 * To run a mutation, you first call `useAcceptToJoinOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptToJoinOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptToJoinOrgMutation, { data, loading, error }] = useAcceptToJoinOrgMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAcceptToJoinOrgMutation(baseOptions?: Apollo.MutationHookOptions<AcceptToJoinOrgMutation, AcceptToJoinOrgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptToJoinOrgMutation, AcceptToJoinOrgMutationVariables>(AcceptToJoinOrgDocument, options);
      }
export type AcceptToJoinOrgMutationHookResult = ReturnType<typeof useAcceptToJoinOrgMutation>;
export type AcceptToJoinOrgMutationResult = Apollo.MutationResult<AcceptToJoinOrgMutation>;
export type AcceptToJoinOrgMutationOptions = Apollo.BaseMutationOptions<AcceptToJoinOrgMutation, AcceptToJoinOrgMutationVariables>;
export const RegisterOrgDocument = gql`
    mutation RegisterOrg($input: RegisterOrgInput!) {
  registerOrg(input: $input) {
    ... on Errors {
      ...Errors
    }
    ... on Org {
      ...OrgPrivateInfo
    }
  }
}
    ${ErrorsFragmentDoc}
${OrgPrivateInfoFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const ReplyInquiryDocument = gql`
    mutation ReplyInquiry($input: replyInquiryInput!) {
  replyInquiry(input: $input) {
    ... on Errors {
      ...Errors
    }
    ... on Inquiry {
      category
      content
      id
      inquiryStatus
      sentAt
      receivedOrg {
        id
      }
      replier {
        id
      }
      sender {
        id
      }
    }
  }
}
    ${ErrorsFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const SendInquiryDocument = gql`
    mutation SendInquiry($input: SendInquiryInput!) {
  sendInquiry(input: $input) {
    ... on Errors {
      ...Errors
    }
    ... on Inquiry {
      category
      content
      id
      inquiryStatus
      receivedOrg {
        id
      }
      replier {
        id
      }
      sender {
        id
      }
      sentAt
    }
  }
}
    ${ErrorsFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const UpdateInquiryStatusDocument = gql`
    mutation UpdateInquiryStatus($input: UpdateInquiryStatusInput!) {
  updateInquiryStatus(input: $input) {
    ... on Errors {
      ...Errors
    }
    ... on Inquiry {
      category
      content
      id
      inquiryStatus
      receivedOrg {
        id
      }
      replier {
        id
      }
      sender {
        id
      }
      sentAt
    }
  }
}
    ${ErrorsFragmentDoc}`;
export type UpdateInquiryStatusMutationFn = Apollo.MutationFunction<UpdateInquiryStatusMutation, UpdateInquiryStatusMutationVariables>;

/**
 * __useUpdateInquiryStatusMutation__
 *
 * To run a mutation, you first call `useUpdateInquiryStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInquiryStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInquiryStatusMutation, { data, loading, error }] = useUpdateInquiryStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateInquiryStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInquiryStatusMutation, UpdateInquiryStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInquiryStatusMutation, UpdateInquiryStatusMutationVariables>(UpdateInquiryStatusDocument, options);
      }
export type UpdateInquiryStatusMutationHookResult = ReturnType<typeof useUpdateInquiryStatusMutation>;
export type UpdateInquiryStatusMutationResult = Apollo.MutationResult<UpdateInquiryStatusMutation>;
export type UpdateInquiryStatusMutationOptions = Apollo.BaseMutationOptions<UpdateInquiryStatusMutation, UpdateInquiryStatusMutationVariables>;
export const UpdateOrgInfoDocument = gql`
    mutation UpdateOrgInfo($input: UpdateOrgInput!) {
  updateOrg(input: $input) {
    ... on Errors {
      ...Errors
    }
    ... on Org {
      ...OrgPrivateInfo
    }
  }
}
    ${ErrorsFragmentDoc}
${OrgPrivateInfoFragmentDoc}`;
export type UpdateOrgInfoMutationFn = Apollo.MutationFunction<UpdateOrgInfoMutation, UpdateOrgInfoMutationVariables>;

/**
 * __useUpdateOrgInfoMutation__
 *
 * To run a mutation, you first call `useUpdateOrgInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrgInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrgInfoMutation, { data, loading, error }] = useUpdateOrgInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrgInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrgInfoMutation, UpdateOrgInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrgInfoMutation, UpdateOrgInfoMutationVariables>(UpdateOrgInfoDocument, options);
      }
export type UpdateOrgInfoMutationHookResult = ReturnType<typeof useUpdateOrgInfoMutation>;
export type UpdateOrgInfoMutationResult = Apollo.MutationResult<UpdateOrgInfoMutation>;
export type UpdateOrgInfoMutationOptions = Apollo.BaseMutationOptions<UpdateOrgInfoMutation, UpdateOrgInfoMutationVariables>;
export const UploadFileDocument = gql`
    mutation UploadFile($file: Upload!) {
  uploadFile(file: $file) {
    encoding
    filename
    mimetype
  }
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadFileMutation, { data, loading, error }] = useUploadFileMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;
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
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser {
    ... on Errors {
      ...Errors
    }
    ... on Succeeded {
      succeeded
    }
  }
}
    ${ErrorsFragmentDoc}`;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
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
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser {
    ... on Errors {
      ...Errors
    }
    ... on Succeeded {
      succeeded
    }
  }
}
    ${ErrorsFragmentDoc}`;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: registerUserInput!) {
  registerUser(input: $input) {
    ... on Errors {
      ...Errors
    }
    ... on User {
      ...UserPrivateInfo
    }
  }
}
    ${ErrorsFragmentDoc}
${UserPrivateInfoFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const ReplyMessageDocument = gql`
    mutation ReplyMessage($input: replyMessageInput!) {
  replyMessage(input: $input) {
    ... on Errors {
      ...Errors
    }
    ... on Message {
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
}
    ${ErrorsFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const SendMessageDocument = gql`
    mutation SendMessage($input: sendMessageInput!) {
  sendMessage(input: $input) {
    ... on Errors {
      ...Errors
    }
    ... on Message {
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
}
    ${ErrorsFragmentDoc}`;
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
 *      input: // value for 'input'
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
export const GetInquiriesByOrgIdDocument = gql`
    query GetInquiriesByOrgId($orgId: String!) {
  getInquiriesByOrgId(orgId: $orgId) {
    ... on Errors {
      ...Errors
    }
    ... on InquiryConnection {
      ...InquiryConnection
    }
  }
}
    ${ErrorsFragmentDoc}
${InquiryConnectionFragmentDoc}`;

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
        ...OrgExceptConnection
      }
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${OrgExceptConnectionFragmentDoc}
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
        ...MessageLeafConnection
      }
    }
    ... on Errors {
      ...Errors
    }
  }
}
    ${MessageLeafConnectionFragmentDoc}
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
export const DialogPostedDocument = gql`
    subscription DialogPosted {
  dialogPosted {
    id
    content
  }
}
    `;

/**
 * __useDialogPostedSubscription__
 *
 * To run a query within a React component, call `useDialogPostedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useDialogPostedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDialogPostedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useDialogPostedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<DialogPostedSubscription, DialogPostedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<DialogPostedSubscription, DialogPostedSubscriptionVariables>(DialogPostedDocument, options);
      }
export type DialogPostedSubscriptionHookResult = ReturnType<typeof useDialogPostedSubscription>;
export type DialogPostedSubscriptionResult = Apollo.SubscriptionResult<DialogPostedSubscription>;