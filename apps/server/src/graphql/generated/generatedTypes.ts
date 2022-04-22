import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { FileModel, UserRoleModel, MessageStatusModel, InquiryCategoryModel, InquiryStatusModel } from '\@kurakichi/domain/src/shared/infra/graphql/MappingModels';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

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
export type ResolversTypes = ResolversObject<{
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
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
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
}>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ApplicationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ApplicationError'] = ResolversParentTypes['ApplicationError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Base'] = ResolversParentTypes['Base']> = ResolversObject<{
  dialogs?: Resolver<Maybe<ResolversTypes['DialogConnection']>, ParentType, ContextType>;
  fellows?: Resolver<Maybe<ResolversTypes['FellowConnection']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  karte?: Resolver<Maybe<ResolversTypes['Karte']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BaseResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['BaseResult'] = ResolversParentTypes['BaseResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Base' | 'Errors', ParentType, ContextType>;
}>;

export type BoolResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoolResult'] = ResolversParentTypes['BoolResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'Succeeded', ParentType, ContextType>;
}>;

export type DialogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dialog'] = ResolversParentTypes['Dialog']> = ResolversObject<{
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DialogConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogConnection'] = ResolversParentTypes['DialogConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<ResolversTypes['DialogEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DialogEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogEdges'] = ResolversParentTypes['DialogEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Dialog'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DialogResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogResult'] = ResolversParentTypes['DialogResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Dialog' | 'Errors', ParentType, ContextType>;
}>;

export type DialogsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dialogs'] = ResolversParentTypes['Dialogs']> = ResolversObject<{
  dialogs?: Resolver<Maybe<Array<ResolversTypes['Dialog']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DialogsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogsResult'] = ResolversParentTypes['DialogsResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Dialogs' | 'Errors', ParentType, ContextType>;
}>;

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = ResolversObject<{
  __resolveType: TypeResolveFn<'ApplicationError' | 'UserError', ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type ErrorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Errors'] = ResolversParentTypes['Errors']> = ResolversObject<{
  applicationError?: Resolver<Maybe<ResolversTypes['ApplicationError']>, ParentType, ContextType>;
  userError?: Resolver<Maybe<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FellowConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FellowConnection'] = ResolversParentTypes['FellowConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<ResolversTypes['FellowEdge']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FellowEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FellowEdge'] = ResolversParentTypes['FellowEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isBaseAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = ResolversObject<{
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiriesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiriesResult'] = ResolversParentTypes['InquiriesResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'InquiryConnection', ParentType, ContextType>;
}>;

export type InquiryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Inquiry'] = ResolversParentTypes['Inquiry']> = ResolversObject<{
  category?: Resolver<Maybe<ResolversTypes['InquiryCategory']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inquiryStatus?: Resolver<Maybe<ResolversTypes['InquiryStatus']>, ParentType, ContextType>;
  receivedOrg?: Resolver<Maybe<ResolversTypes['Org']>, ParentType, ContextType>;
  replier?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface InquiryCategoryScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['InquiryCategory'], any> {
  name: 'InquiryCategory';
}

export type InquiryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryConnection'] = ResolversParentTypes['InquiryConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<ResolversTypes['InquiryEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryEdges'] = ResolversParentTypes['InquiryEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Inquiry'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryLeafConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryLeafConnection'] = ResolversParentTypes['InquiryLeafConnection']> = ResolversObject<{
  edges?: Resolver<Array<Maybe<ResolversTypes['InquiryLeafEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryLeafEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryLeafEdges'] = ResolversParentTypes['InquiryLeafEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isRoot?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Inquiry'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryResult'] = ResolversParentTypes['InquiryResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'Inquiry', ParentType, ContextType>;
}>;

export interface InquiryStatusScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['InquiryStatus'], any> {
  name: 'InquiryStatus';
}

export type InquiryTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryTree'] = ResolversParentTypes['InquiryTree']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  leaves?: Resolver<Maybe<ResolversTypes['InquiryLeafConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryTreeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryTreeResult'] = ResolversParentTypes['InquiryTreeResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'InquiryTree', ParentType, ContextType>;
}>;

export type KarteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Karte'] = ResolversParentTypes['Karte']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type KarteResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['KarteResult'] = ResolversParentTypes['KarteResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'Karte', ParentType, ContextType>;
}>;

export type MemberConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberConnection'] = ResolversParentTypes['MemberConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<ResolversTypes['MemberEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberEdges'] = ResolversParentTypes['MemberEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAdmin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = ResolversObject<{
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  receiver?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['MessageStatus']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageConnection'] = ResolversParentTypes['MessageConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<ResolversTypes['MessageEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageEdges'] = ResolversParentTypes['MessageEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageLeafConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageLeafConnection'] = ResolversParentTypes['MessageLeafConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<ResolversTypes['MessageLeafEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageLeafEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageLeafEdges'] = ResolversParentTypes['MessageLeafEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isRoot?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Message'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageResult'] = ResolversParentTypes['MessageResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'Message', ParentType, ContextType>;
}>;

export interface MessageStatusScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MessageStatus'], any> {
  name: 'MessageStatus';
}

export type MessageTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageTree'] = ResolversParentTypes['MessageTree']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  leaves?: Resolver<Maybe<ResolversTypes['MessageLeafConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageTreeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageTreeResult'] = ResolversParentTypes['MessageTreeResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'MessageTree', ParentType, ContextType>;
}>;

export type MessagesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Messages'] = ResolversParentTypes['Messages']> = ResolversObject<{
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessagesResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessagesResult'] = ResolversParentTypes['MessagesResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'Messages', ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
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
}>;

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Base' | 'Dialog' | 'Inquiry' | 'InquiryTree' | 'Karte' | 'Message' | 'MessageTree' | 'Org' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
}>;

export type OrgResolvers<ContextType = any, ParentType extends ResolversParentTypes['Org'] = ResolversParentTypes['Org']> = ResolversObject<{
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
}>;

export type OrgConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgConnection'] = ResolversParentTypes['OrgConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<ResolversTypes['OrgEdges']>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrgEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgEdges'] = ResolversParentTypes['OrgEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Org'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrgResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgResult'] = ResolversParentTypes['OrgResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'Org', ParentType, ContextType>;
}>;

export type OrgsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Orgs'] = ResolversParentTypes['Orgs']> = ResolversObject<{
  orgs?: Resolver<Maybe<Array<ResolversTypes['Org']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrgsResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgsResult'] = ResolversParentTypes['OrgsResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'Orgs', ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNext?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPrevious?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostDialogResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostDialogResult'] = ResolversParentTypes['PostDialogResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Dialog' | 'Errors', ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
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
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  dialogPosted?: SubscriptionResolver<Maybe<ResolversTypes['Dialog']>, "dialogPosted", ParentType, ContextType>;
}>;

export type SucceededResolvers<ContextType = any, ParentType extends ResolversParentTypes['Succeeded'] = ResolversParentTypes['Succeeded']> = ResolversObject<{
  succeeded?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
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
}>;

export type UserErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserError'] = ResolversParentTypes['UserError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'User', ParentType, ContextType>;
}>;

export interface UserRoleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UserRole'], any> {
  name: 'UserRole';
}

export type UsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['Users'] = ResolversParentTypes['Users']> = ResolversObject<{
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UsersResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersResult'] = ResolversParentTypes['UsersResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Errors' | 'Users', ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
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
}>;

