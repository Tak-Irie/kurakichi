import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { HogeModel, UserRoleModel } from '\@kurakichi/modules/shared/infra/graphql/models';
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
  address?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type ApplicationError = {
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

export type BasePayload = {
  __typename?: 'BasePayload';
  base?: Maybe<Base>;
  errors?: Maybe<Errors>;
};

export type BoolPayload = {
  __typename?: 'BoolPayload';
  errors?: Maybe<Errors>;
  message?: Maybe<Scalars['String']>;
  result: Scalars['Boolean'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  errors?: Maybe<Errors>;
  result: Scalars['Boolean'];
};

export type Dialog = Node & {
  __typename?: 'Dialog';
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DialogConnection = {
  __typename?: 'DialogConnection';
  edges?: Maybe<Array<Maybe<DialogEdges>>>;
  pageInfo: PageInfo;
};

export type DialogEdges = {
  __typename?: 'DialogEdges';
  cursor: Scalars['String'];
  node?: Maybe<Dialog>;
};

export type DialogPayload = {
  __typename?: 'DialogPayload';
  dialog?: Maybe<Array<Maybe<Dialog>>>;
  errors?: Maybe<Errors>;
};

export type Errors = {
  __typename?: 'Errors';
  applicationError?: Maybe<ApplicationError>;
  userError?: Maybe<UserError>;
};

export type FellowConnection = {
  __typename?: 'FellowConnection';
  edges?: Maybe<Array<Maybe<FellowEdge>>>;
  pageInfo: PageInfo;
};

export type FellowEdge = {
  __typename?: 'FellowEdge';
  cursor: Scalars['String'];
  isBaseAdmin: Scalars['Boolean'];
  node?: Maybe<User>;
};

export type Hoge = {
  __typename?: 'Hoge';
  id: Scalars['ID'];
};

export type InquiriesPayload = {
  __typename?: 'InquiriesPayload';
  errors?: Maybe<Errors>;
  inquiries?: Maybe<InquiryConnection>;
};

export type Inquiry = Node & {
  __typename?: 'Inquiry';
  category?: Maybe<Scalars['InquiryCategory']>;
  content?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inquiryStatus?: Maybe<Scalars['InquiryStatus']>;
  receiver?: Maybe<Org>;
  sender?: Maybe<User>;
  sentAt?: Maybe<Scalars['String']>;
};

export type InquiryConnection = {
  __typename?: 'InquiryConnection';
  edges?: Maybe<Array<Maybe<InquiryEdges>>>;
  pageInfo: PageInfo;
};

export type InquiryEdges = {
  __typename?: 'InquiryEdges';
  cursor: Scalars['String'];
  node?: Maybe<Inquiry>;
};

export type InquiryLeafConnection = {
  __typename?: 'InquiryLeafConnection';
  edges?: Maybe<Array<Maybe<InquiryLeafEdges>>>;
  pageInfo: PageInfo;
};

export type InquiryLeafEdges = {
  __typename?: 'InquiryLeafEdges';
  cursor: Scalars['String'];
  isRoot: Scalars['Boolean'];
  node?: Maybe<Inquiry>;
};

export type InquiryPayload = {
  __typename?: 'InquiryPayload';
  errors?: Maybe<Errors>;
  inquiry?: Maybe<Inquiry>;
};

export type InquiryTree = Node & {
  __typename?: 'InquiryTree';
  id: Scalars['ID'];
  leaves?: Maybe<InquiryLeafConnection>;
};

export type InquiryTreePayload = {
  __typename?: 'InquiryTreePayload';
  errors?: Maybe<Errors>;
  inquiryTree?: Maybe<InquiryTree>;
};

export type Karte = Node & {
  __typename?: 'Karte';
  id: Scalars['ID'];
};

export type KartePayload = {
  __typename?: 'KartePayload';
  errors?: Maybe<Errors>;
  karte?: Maybe<Karte>;
};

export type MemberConnection = {
  __typename?: 'MemberConnection';
  edges?: Maybe<Array<Maybe<MemberEdges>>>;
  pageInfo: PageInfo;
};

export type MemberEdges = {
  __typename?: 'MemberEdges';
  cursor: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  node?: Maybe<User>;
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
  edges?: Maybe<Array<Maybe<MessageEdges>>>;
  pageInfo: PageInfo;
};

export type MessageEdges = {
  __typename?: 'MessageEdges';
  cursor: Scalars['String'];
  node?: Maybe<Message>;
};

export type MessageLeafConnection = {
  __typename?: 'MessageLeafConnection';
  edges?: Maybe<Array<Maybe<MessageLeafEdges>>>;
  pageInfo: PageInfo;
};

export type MessageLeafEdges = {
  __typename?: 'MessageLeafEdges';
  cursor: Scalars['String'];
  isRoot: Scalars['Boolean'];
  node?: Maybe<Message>;
};

export type MessagePayload = {
  __typename?: 'MessagePayload';
  errors?: Maybe<Errors>;
  message?: Maybe<Message>;
};

export type MessageTree = Node & {
  __typename?: 'MessageTree';
  id: Scalars['ID'];
  leaves?: Maybe<MessageLeafConnection>;
};

export type MessageTreePayload = {
  __typename?: 'MessageTreePayload';
  errors?: Maybe<Errors>;
  messageTree?: Maybe<MessageTree>;
};

export type MessagesPayload = {
  __typename?: 'MessagesPayload';
  errors?: Maybe<Errors>;
  messages?: Maybe<Array<Maybe<Message>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptJoinOrg?: Maybe<OrgPayload>;
  deleteUser?: Maybe<BoolPayload>;
  forgetPassword?: Maybe<BoolPayload>;
  loginUser?: Maybe<UserPayload>;
  logoutUser?: Maybe<BoolPayload>;
  postDialog?: Maybe<PostDialogPayload>;
  registerOrg?: Maybe<OrgPayload>;
  registerUser?: Maybe<UserPayload>;
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


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationPostDialogArgs = {
  content: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRegisterOrgArgs = {
  input?: InputMaybe<RegisterOrgInput>;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationReplyInquiryArgs = {
  content: Scalars['String'];
  replyTargetId: Scalars['String'];
};


export type MutationReplyMessageArgs = {
  input: ReplyMessageInput;
};


export type MutationRequestJoinOrgArgs = {
  orgId: Scalars['String'];
};


export type MutationSendInquiryArgs = {
  input?: InputMaybe<SendInquiryInput>;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationUpdateInquiryStatusArgs = {
  input?: InputMaybe<UpdateInquiryStatusInput>;
};


export type MutationUpdateOrgArgs = {
  input?: InputMaybe<UpdateOrgInput>;
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

export type OrgPayload = {
  __typename?: 'OrgPayload';
  errors?: Maybe<Errors>;
  org?: Maybe<Org>;
};

export type OrgsPayload = {
  __typename?: 'OrgsPayload';
  errors?: Maybe<Errors>;
  orgs?: Maybe<Array<Maybe<Org>>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNext: Scalars['Boolean'];
  hasPrevious: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PostDialogPayload = {
  __typename?: 'PostDialogPayload';
  dialog?: Maybe<Dialog>;
  errors?: Maybe<Errors>;
};

export type Query = {
  __typename?: 'Query';
  getBase?: Maybe<Base>;
  getDialogsByBaseId?: Maybe<Array<Maybe<Dialog>>>;
  getInquiries?: Maybe<InquiriesPayload>;
  getInquiriesByTreeId?: Maybe<InquiryTreePayload>;
  getInquiry?: Maybe<InquiryPayload>;
  getKarte?: Maybe<Karte>;
  getMessagesByCookie?: Maybe<MessagesPayload>;
  getMessagesByTreeId?: Maybe<MessageTreePayload>;
  getOrg?: Maybe<OrgPayload>;
  getOrgInfoByMemberCookie?: Maybe<OrgPayload>;
  getOrgs?: Maybe<OrgsPayload>;
  getUserByCookie?: Maybe<UserPayload>;
  getUserById?: Maybe<UserPayload>;
  getUsers?: Maybe<UsersPayload>;
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


export type QueryGetInquiriesByTreeIdArgs = {
  id: Scalars['String'];
};


export type QueryGetInquiryArgs = {
  id: Scalars['String'];
};


export type QueryGetKarteArgs = {
  id: Scalars['String'];
};


export type QueryGetMessagesByTreeIdArgs = {
  input: GetMessagesByTreeIdInput;
};


export type QueryGetOrgArgs = {
  id: Scalars['String'];
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
  userId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  dialogPosted?: Maybe<Dialog>;
};

export type UpdateInquiryStatusInput = {
  id: Scalars['ID'];
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

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  errors?: Maybe<Errors>;
  user?: Maybe<User>;
};

export type UsersPayload = {
  __typename?: 'UsersPayload';
  errors?: Maybe<Errors>;
  users?: Maybe<Array<User>>;
};

export type GetMessagesByTreeIdInput = {
  treeId: Scalars['String'];
  userId: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
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
  BasePayload: ResolverTypeWrapper<BasePayload>;
  BoolPayload: ResolverTypeWrapper<BoolPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DeleteUserPayload: ResolverTypeWrapper<DeleteUserPayload>;
  Dialog: ResolverTypeWrapper<Dialog>;
  DialogConnection: ResolverTypeWrapper<DialogConnection>;
  DialogEdges: ResolverTypeWrapper<DialogEdges>;
  DialogPayload: ResolverTypeWrapper<DialogPayload>;
  Errors: ResolverTypeWrapper<Errors>;
  FellowConnection: ResolverTypeWrapper<FellowConnection>;
  FellowEdge: ResolverTypeWrapper<FellowEdge>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Hoge: ResolverTypeWrapper<HogeModel>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InquiriesPayload: ResolverTypeWrapper<InquiriesPayload>;
  Inquiry: ResolverTypeWrapper<Inquiry>;
  InquiryCategory: ResolverTypeWrapper<Scalars['InquiryCategory']>;
  InquiryConnection: ResolverTypeWrapper<InquiryConnection>;
  InquiryEdges: ResolverTypeWrapper<InquiryEdges>;
  InquiryLeafConnection: ResolverTypeWrapper<InquiryLeafConnection>;
  InquiryLeafEdges: ResolverTypeWrapper<InquiryLeafEdges>;
  InquiryPayload: ResolverTypeWrapper<InquiryPayload>;
  InquiryStatus: ResolverTypeWrapper<Scalars['InquiryStatus']>;
  InquiryTree: ResolverTypeWrapper<InquiryTree>;
  InquiryTreePayload: ResolverTypeWrapper<InquiryTreePayload>;
  Karte: ResolverTypeWrapper<Karte>;
  KartePayload: ResolverTypeWrapper<KartePayload>;
  MemberConnection: ResolverTypeWrapper<MemberConnection>;
  MemberEdges: ResolverTypeWrapper<MemberEdges>;
  Message: ResolverTypeWrapper<Message>;
  MessageConnection: ResolverTypeWrapper<MessageConnection>;
  MessageEdges: ResolverTypeWrapper<MessageEdges>;
  MessageLeafConnection: ResolverTypeWrapper<MessageLeafConnection>;
  MessageLeafEdges: ResolverTypeWrapper<MessageLeafEdges>;
  MessagePayload: ResolverTypeWrapper<MessagePayload>;
  MessageStatus: ResolverTypeWrapper<Scalars['MessageStatus']>;
  MessageTree: ResolverTypeWrapper<MessageTree>;
  MessageTreePayload: ResolverTypeWrapper<MessageTreePayload>;
  MessagesPayload: ResolverTypeWrapper<MessagesPayload>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Base'] | ResolversTypes['Dialog'] | ResolversTypes['Inquiry'] | ResolversTypes['InquiryTree'] | ResolversTypes['Karte'] | ResolversTypes['Message'] | ResolversTypes['MessageTree'] | ResolversTypes['Org'] | ResolversTypes['User'];
  Org: ResolverTypeWrapper<Org>;
  OrgPayload: ResolverTypeWrapper<OrgPayload>;
  OrgsPayload: ResolverTypeWrapper<OrgsPayload>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  PostDialogPayload: ResolverTypeWrapper<PostDialogPayload>;
  Query: ResolverTypeWrapper<{}>;
  RegisterOrgInput: RegisterOrgInput;
  SendInquiryInput: SendInquiryInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateInquiryStatusInput: UpdateInquiryStatusInput;
  UpdateOrgInput: UpdateOrgInput;
  User: ResolverTypeWrapper<Omit<User, 'role'> & { role?: Maybe<ResolversTypes['UserRole']> }>;
  UserError: ResolverTypeWrapper<UserError>;
  UserPayload: ResolverTypeWrapper<UserPayload>;
  UserRole: ResolverTypeWrapper<UserRoleModel>;
  UsersPayload: ResolverTypeWrapper<UsersPayload>;
  getMessagesByTreeIdInput: GetMessagesByTreeIdInput;
  loginUserInput: LoginUserInput;
  registerUserInput: RegisterUserInput;
  replyMessageInput: ReplyMessageInput;
  sendMessageInput: SendMessageInput;
  updateUserInput: UpdateUserInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address;
  ApplicationError: ApplicationError;
  Base: Base;
  BasePayload: BasePayload;
  BoolPayload: BoolPayload;
  Boolean: Scalars['Boolean'];
  DeleteUserPayload: DeleteUserPayload;
  Dialog: Dialog;
  DialogConnection: DialogConnection;
  DialogEdges: DialogEdges;
  DialogPayload: DialogPayload;
  Errors: Errors;
  FellowConnection: FellowConnection;
  FellowEdge: FellowEdge;
  Float: Scalars['Float'];
  Hoge: HogeModel;
  ID: Scalars['ID'];
  InquiriesPayload: InquiriesPayload;
  Inquiry: Inquiry;
  InquiryCategory: Scalars['InquiryCategory'];
  InquiryConnection: InquiryConnection;
  InquiryEdges: InquiryEdges;
  InquiryLeafConnection: InquiryLeafConnection;
  InquiryLeafEdges: InquiryLeafEdges;
  InquiryPayload: InquiryPayload;
  InquiryStatus: Scalars['InquiryStatus'];
  InquiryTree: InquiryTree;
  InquiryTreePayload: InquiryTreePayload;
  Karte: Karte;
  KartePayload: KartePayload;
  MemberConnection: MemberConnection;
  MemberEdges: MemberEdges;
  Message: Message;
  MessageConnection: MessageConnection;
  MessageEdges: MessageEdges;
  MessageLeafConnection: MessageLeafConnection;
  MessageLeafEdges: MessageLeafEdges;
  MessagePayload: MessagePayload;
  MessageStatus: Scalars['MessageStatus'];
  MessageTree: MessageTree;
  MessageTreePayload: MessageTreePayload;
  MessagesPayload: MessagesPayload;
  Mutation: {};
  Node: ResolversParentTypes['Base'] | ResolversParentTypes['Dialog'] | ResolversParentTypes['Inquiry'] | ResolversParentTypes['InquiryTree'] | ResolversParentTypes['Karte'] | ResolversParentTypes['Message'] | ResolversParentTypes['MessageTree'] | ResolversParentTypes['Org'] | ResolversParentTypes['User'];
  Org: Org;
  OrgPayload: OrgPayload;
  OrgsPayload: OrgsPayload;
  PageInfo: PageInfo;
  PostDialogPayload: PostDialogPayload;
  Query: {};
  RegisterOrgInput: RegisterOrgInput;
  SendInquiryInput: SendInquiryInput;
  String: Scalars['String'];
  Subscription: {};
  UpdateInquiryStatusInput: UpdateInquiryStatusInput;
  UpdateOrgInput: UpdateOrgInput;
  User: Omit<User, 'role'> & { role?: Maybe<ResolversParentTypes['UserRole']> };
  UserError: UserError;
  UserPayload: UserPayload;
  UserRole: UserRoleModel;
  UsersPayload: UsersPayload;
  getMessagesByTreeIdInput: GetMessagesByTreeIdInput;
  loginUserInput: LoginUserInput;
  registerUserInput: RegisterUserInput;
  replyMessageInput: ReplyMessageInput;
  sendMessageInput: SendMessageInput;
  updateUserInput: UpdateUserInput;
}>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
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

export type BasePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['BasePayload'] = ResolversParentTypes['BasePayload']> = ResolversObject<{
  base?: Resolver<Maybe<ResolversTypes['Base']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BoolPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['BoolPayload'] = ResolversParentTypes['BoolPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserPayload'] = ResolversParentTypes['DeleteUserPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DialogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dialog'] = ResolversParentTypes['Dialog']> = ResolversObject<{
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DialogConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogConnection'] = ResolversParentTypes['DialogConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['DialogEdges']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DialogEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogEdges'] = ResolversParentTypes['DialogEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Dialog']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DialogPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DialogPayload'] = ResolversParentTypes['DialogPayload']> = ResolversObject<{
  dialog?: Resolver<Maybe<Array<Maybe<ResolversTypes['Dialog']>>>, ParentType, ContextType>;
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ErrorsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Errors'] = ResolversParentTypes['Errors']> = ResolversObject<{
  applicationError?: Resolver<Maybe<ResolversTypes['ApplicationError']>, ParentType, ContextType>;
  userError?: Resolver<Maybe<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FellowConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FellowConnection'] = ResolversParentTypes['FellowConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['FellowEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FellowEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FellowEdge'] = ResolversParentTypes['FellowEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isBaseAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HogeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Hoge'] = ResolversParentTypes['Hoge']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiriesPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiriesPayload'] = ResolversParentTypes['InquiriesPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  inquiries?: Resolver<Maybe<ResolversTypes['InquiryConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Inquiry'] = ResolversParentTypes['Inquiry']> = ResolversObject<{
  category?: Resolver<Maybe<ResolversTypes['InquiryCategory']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inquiryStatus?: Resolver<Maybe<ResolversTypes['InquiryStatus']>, ParentType, ContextType>;
  receiver?: Resolver<Maybe<ResolversTypes['Org']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface InquiryCategoryScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['InquiryCategory'], any> {
  name: 'InquiryCategory';
}

export type InquiryConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryConnection'] = ResolversParentTypes['InquiryConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['InquiryEdges']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryEdges'] = ResolversParentTypes['InquiryEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Inquiry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryLeafConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryLeafConnection'] = ResolversParentTypes['InquiryLeafConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['InquiryLeafEdges']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryLeafEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryLeafEdges'] = ResolversParentTypes['InquiryLeafEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isRoot?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Inquiry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryPayload'] = ResolversParentTypes['InquiryPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  inquiry?: Resolver<Maybe<ResolversTypes['Inquiry']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface InquiryStatusScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['InquiryStatus'], any> {
  name: 'InquiryStatus';
}

export type InquiryTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryTree'] = ResolversParentTypes['InquiryTree']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  leaves?: Resolver<Maybe<ResolversTypes['InquiryLeafConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryTreePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['InquiryTreePayload'] = ResolversParentTypes['InquiryTreePayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  inquiryTree?: Resolver<Maybe<ResolversTypes['InquiryTree']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type KarteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Karte'] = ResolversParentTypes['Karte']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type KartePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['KartePayload'] = ResolversParentTypes['KartePayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  karte?: Resolver<Maybe<ResolversTypes['Karte']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberConnection'] = ResolversParentTypes['MemberConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['MemberEdges']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MemberEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MemberEdges'] = ResolversParentTypes['MemberEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAdmin?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
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
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['MessageEdges']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageEdges'] = ResolversParentTypes['MessageEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageLeafConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageLeafConnection'] = ResolversParentTypes['MessageLeafConnection']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['MessageLeafEdges']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageLeafEdgesResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageLeafEdges'] = ResolversParentTypes['MessageLeafEdges']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isRoot?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessagePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessagePayload'] = ResolversParentTypes['MessagePayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface MessageStatusScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MessageStatus'], any> {
  name: 'MessageStatus';
}

export type MessageTreeResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageTree'] = ResolversParentTypes['MessageTree']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  leaves?: Resolver<Maybe<ResolversTypes['MessageLeafConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageTreePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageTreePayload'] = ResolversParentTypes['MessageTreePayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  messageTree?: Resolver<Maybe<ResolversTypes['MessageTree']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessagesPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessagesPayload'] = ResolversParentTypes['MessagesPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  acceptJoinOrg?: Resolver<Maybe<ResolversTypes['OrgPayload']>, ParentType, ContextType, RequireFields<MutationAcceptJoinOrgArgs, 'requestUserId' | 'requestedOrgId'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['BoolPayload']>, ParentType, ContextType>;
  forgetPassword?: Resolver<Maybe<ResolversTypes['BoolPayload']>, ParentType, ContextType, RequireFields<MutationForgetPasswordArgs, 'email'>>;
  loginUser?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  logoutUser?: Resolver<Maybe<ResolversTypes['BoolPayload']>, ParentType, ContextType>;
  postDialog?: Resolver<Maybe<ResolversTypes['PostDialogPayload']>, ParentType, ContextType, RequireFields<MutationPostDialogArgs, 'content' | 'userId'>>;
  registerOrg?: Resolver<Maybe<ResolversTypes['OrgPayload']>, ParentType, ContextType, Partial<MutationRegisterOrgArgs>>;
  registerUser?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
  replyInquiry?: Resolver<Maybe<ResolversTypes['InquiryPayload']>, ParentType, ContextType, RequireFields<MutationReplyInquiryArgs, 'content' | 'replyTargetId'>>;
  replyMessage?: Resolver<Maybe<ResolversTypes['MessagePayload']>, ParentType, ContextType, RequireFields<MutationReplyMessageArgs, 'input'>>;
  requestJoinOrg?: Resolver<Maybe<ResolversTypes['OrgPayload']>, ParentType, ContextType, RequireFields<MutationRequestJoinOrgArgs, 'orgId'>>;
  sendInquiry?: Resolver<Maybe<ResolversTypes['InquiryPayload']>, ParentType, ContextType, Partial<MutationSendInquiryArgs>>;
  sendMessage?: Resolver<Maybe<ResolversTypes['MessagePayload']>, ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'input'>>;
  updateInquiryStatus?: Resolver<Maybe<ResolversTypes['InquiryPayload']>, ParentType, ContextType, Partial<MutationUpdateInquiryStatusArgs>>;
  updateOrg?: Resolver<Maybe<ResolversTypes['OrgPayload']>, ParentType, ContextType, Partial<MutationUpdateOrgArgs>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
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

export type OrgPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgPayload'] = ResolversParentTypes['OrgPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  org?: Resolver<Maybe<ResolversTypes['Org']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrgsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrgsPayload'] = ResolversParentTypes['OrgsPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  orgs?: Resolver<Maybe<Array<Maybe<ResolversTypes['Org']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNext?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPrevious?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostDialogPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostDialogPayload'] = ResolversParentTypes['PostDialogPayload']> = ResolversObject<{
  dialog?: Resolver<Maybe<ResolversTypes['Dialog']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getBase?: Resolver<Maybe<ResolversTypes['Base']>, ParentType, ContextType, RequireFields<QueryGetBaseArgs, 'id'>>;
  getDialogsByBaseId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Dialog']>>>, ParentType, ContextType, RequireFields<QueryGetDialogsByBaseIdArgs, 'id'>>;
  getInquiries?: Resolver<Maybe<ResolversTypes['InquiriesPayload']>, ParentType, ContextType>;
  getInquiriesByTreeId?: Resolver<Maybe<ResolversTypes['InquiryTreePayload']>, ParentType, ContextType, RequireFields<QueryGetInquiriesByTreeIdArgs, 'id'>>;
  getInquiry?: Resolver<Maybe<ResolversTypes['InquiryPayload']>, ParentType, ContextType, RequireFields<QueryGetInquiryArgs, 'id'>>;
  getKarte?: Resolver<Maybe<ResolversTypes['Karte']>, ParentType, ContextType, RequireFields<QueryGetKarteArgs, 'id'>>;
  getMessagesByCookie?: Resolver<Maybe<ResolversTypes['MessagesPayload']>, ParentType, ContextType>;
  getMessagesByTreeId?: Resolver<Maybe<ResolversTypes['MessageTreePayload']>, ParentType, ContextType, RequireFields<QueryGetMessagesByTreeIdArgs, 'input'>>;
  getOrg?: Resolver<Maybe<ResolversTypes['OrgPayload']>, ParentType, ContextType, RequireFields<QueryGetOrgArgs, 'id'>>;
  getOrgInfoByMemberCookie?: Resolver<Maybe<ResolversTypes['OrgPayload']>, ParentType, ContextType>;
  getOrgs?: Resolver<Maybe<ResolversTypes['OrgsPayload']>, ParentType, ContextType>;
  getUserByCookie?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType>;
  getUserById?: Resolver<Maybe<ResolversTypes['UserPayload']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'userId'>>;
  getUsers?: Resolver<Maybe<ResolversTypes['UsersPayload']>, ParentType, ContextType>;
  hoge?: Resolver<Maybe<ResolversTypes['Hoge']>, ParentType, ContextType, RequireFields<QueryHogeArgs, 'id'>>;
  node?: Resolver<Maybe<ResolversTypes['Node']>, ParentType, ContextType, RequireFields<QueryNodeArgs, 'id'>>;
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Node']>>>, ParentType, ContextType, RequireFields<QueryNodesArgs, 'ids'>>;
}>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  dialogPosted?: SubscriptionResolver<Maybe<ResolversTypes['Dialog']>, "dialogPosted", ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatarUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  heroImageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Maybe<ResolversTypes['MessageConnection']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  selfIntro?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserError'] = ResolversParentTypes['UserError']> = ResolversObject<{
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPayload'] = ResolversParentTypes['UserPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface UserRoleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UserRole'], any> {
  name: 'UserRole';
}

export type UsersPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersPayload'] = ResolversParentTypes['UsersPayload']> = ResolversObject<{
  errors?: Resolver<Maybe<ResolversTypes['Errors']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Address?: AddressResolvers<ContextType>;
  ApplicationError?: ApplicationErrorResolvers<ContextType>;
  Base?: BaseResolvers<ContextType>;
  BasePayload?: BasePayloadResolvers<ContextType>;
  BoolPayload?: BoolPayloadResolvers<ContextType>;
  DeleteUserPayload?: DeleteUserPayloadResolvers<ContextType>;
  Dialog?: DialogResolvers<ContextType>;
  DialogConnection?: DialogConnectionResolvers<ContextType>;
  DialogEdges?: DialogEdgesResolvers<ContextType>;
  DialogPayload?: DialogPayloadResolvers<ContextType>;
  Errors?: ErrorsResolvers<ContextType>;
  FellowConnection?: FellowConnectionResolvers<ContextType>;
  FellowEdge?: FellowEdgeResolvers<ContextType>;
  Hoge?: HogeResolvers<ContextType>;
  InquiriesPayload?: InquiriesPayloadResolvers<ContextType>;
  Inquiry?: InquiryResolvers<ContextType>;
  InquiryCategory?: GraphQLScalarType;
  InquiryConnection?: InquiryConnectionResolvers<ContextType>;
  InquiryEdges?: InquiryEdgesResolvers<ContextType>;
  InquiryLeafConnection?: InquiryLeafConnectionResolvers<ContextType>;
  InquiryLeafEdges?: InquiryLeafEdgesResolvers<ContextType>;
  InquiryPayload?: InquiryPayloadResolvers<ContextType>;
  InquiryStatus?: GraphQLScalarType;
  InquiryTree?: InquiryTreeResolvers<ContextType>;
  InquiryTreePayload?: InquiryTreePayloadResolvers<ContextType>;
  Karte?: KarteResolvers<ContextType>;
  KartePayload?: KartePayloadResolvers<ContextType>;
  MemberConnection?: MemberConnectionResolvers<ContextType>;
  MemberEdges?: MemberEdgesResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageConnection?: MessageConnectionResolvers<ContextType>;
  MessageEdges?: MessageEdgesResolvers<ContextType>;
  MessageLeafConnection?: MessageLeafConnectionResolvers<ContextType>;
  MessageLeafEdges?: MessageLeafEdgesResolvers<ContextType>;
  MessagePayload?: MessagePayloadResolvers<ContextType>;
  MessageStatus?: GraphQLScalarType;
  MessageTree?: MessageTreeResolvers<ContextType>;
  MessageTreePayload?: MessageTreePayloadResolvers<ContextType>;
  MessagesPayload?: MessagesPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Org?: OrgResolvers<ContextType>;
  OrgPayload?: OrgPayloadResolvers<ContextType>;
  OrgsPayload?: OrgsPayloadResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  PostDialogPayload?: PostDialogPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserError?: UserErrorResolvers<ContextType>;
  UserPayload?: UserPayloadResolvers<ContextType>;
  UserRole?: GraphQLScalarType;
  UsersPayload?: UsersPayloadResolvers<ContextType>;
}>;

