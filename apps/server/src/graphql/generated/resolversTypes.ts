import { GraphQLResolveInfo } from "graphql";
import { HogeModel } from "@kurakichi/modules/shared/infra/graphql/models";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Base = Node & {
  __typename?: "Base";
  baseOwner?: Maybe<User>;
  id: Scalars["ID"];
  members?: Maybe<Array<Maybe<User>>>;
};

export type BasePayload = {
  __typename?: "BasePayload";
  base?: Maybe<Base>;
  error?: Maybe<RegularError>;
};

export type Dialog = Node & {
  __typename?: "Dialog";
  base?: Maybe<Base>;
  dialogContent?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type DialogPayload = {
  __typename?: "DialogPayload";
  dialog?: Maybe<Array<Maybe<Dialog>>>;
  error?: Maybe<RegularError>;
};

export type Hoge = {
  __typename?: "Hoge";
  id: Scalars["ID"];
};

export type Inquiry = Node & {
  __typename?: "Inquiry";
  category?: Maybe<InquiryCategory>;
  content?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  inquiryStatus?: Maybe<InquiryStatus>;
  sender?: Maybe<User>;
  sentAt?: Maybe<Scalars["String"]>;
  tree?: Maybe<InquiryTree>;
};

export enum InquiryCategory {
  Application = "APPLICATION",
  Contact = "CONTACT",
  Counsel = "COUNSEL",
  Inquiry = "INQUIRY",
  Others = "OTHERS",
}

export type InquiryPayload = {
  __typename?: "InquiryPayload";
  error?: Maybe<RegularError>;
  inquiries?: Maybe<Array<Maybe<Inquiry>>>;
  inquiry?: Maybe<Inquiry>;
  inquiryTree?: Maybe<InquiryTree>;
  pageInfo?: Maybe<PageInfo>;
};

export enum InquiryStatus {
  Done = "DONE",
  Draft = "DRAFT",
  Unread = "UNREAD",
  Working = "WORKING",
}

export type InquiryTree = Node & {
  __typename?: "InquiryTree";
  id: Scalars["ID"];
  treedInquiry?: Maybe<Array<Maybe<Inquiry>>>;
};

export type Message = Node & {
  __typename?: "Message";
  content?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  messageStatus?: Maybe<MessageStatus>;
  receiver?: Maybe<User>;
  sender?: Maybe<User>;
  sentAt?: Maybe<Scalars["String"]>;
  tree?: Maybe<MessageTree>;
};

export type MessagePayload = {
  __typename?: "MessagePayload";
  error?: Maybe<RegularError>;
  message?: Maybe<Message>;
  messageTree?: Maybe<MessageTree>;
  messages?: Maybe<Array<Maybe<Message>>>;
  pageInfo?: Maybe<PageInfo>;
};

export enum MessageStatus {
  Draft = "DRAFT",
  Read = "READ",
  Unread = "UNREAD",
}

export type MessageTree = Node & {
  __typename?: "MessageTree";
  id: Scalars["ID"];
  treedMessage?: Maybe<Array<Maybe<Message>>>;
};

export type Mutation = {
  __typename?: "Mutation";
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
  requestUserId: Scalars["String"];
  requestedOrgId: Scalars["String"];
};

export type MutationChangePasswordArgs = {
  currentPass: Scalars["String"];
  newPass: Scalars["String"];
};

export type MutationForgetPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationPostDialogArgs = {
  dialogContent: Scalars["String"];
  id: Scalars["String"];
};

export type MutationRegisterOrgArgs = {
  email: Scalars["String"];
  address: Scalars["String"];
  name: Scalars["String"];
  phoneNumber: Scalars["String"];
};

export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

export type MutationReplyInquiryArgs = {
  content: Scalars["String"];
  replyTargetId: Scalars["String"];
};

export type MutationReplyMessageArgs = {
  content: Scalars["String"];
  replyTargetId: Scalars["String"];
};

export type MutationRequestJoinOrgArgs = {
  orgId: Scalars["String"];
};

export type MutationSendInquiryArgs = {
  category?: InputMaybe<InquiryCategory>;
  orgId: Scalars["String"];
  receiverId: Scalars["String"];
  status?: InputMaybe<InquiryStatus>;
  textInput: Scalars["String"];
};

export type MutationSendMessageArgs = {
  receiverId: Scalars["String"];
  textInput: Scalars["String"];
};

export type MutationUpdateInquiryStatusArgs = {
  inquiryId: Scalars["String"];
  inquiryStatus: InquiryStatus;
};

export type MutationUpdateOrgArgs = {
  input?: InputMaybe<OrgUpdateInput>;
  orgId: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  avatar?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["String"]>;
  userName?: InputMaybe<Scalars["String"]>;
};

export type Node = {
  id: Scalars["ID"];
};

export type Org = Node & {
  __typename?: "Org";
  avatar?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  homePage?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  inquiries?: Maybe<Array<Maybe<Inquiry>>>;
  latitude?: Maybe<Scalars["Float"]>;
  address?: Maybe<Scalars["String"]>;
  longitude?: Maybe<Scalars["Float"]>;
  members?: Maybe<Array<Maybe<User>>>;
  orgName?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
};

export type OrgPayload = {
  __typename?: "OrgPayload";
  error?: Maybe<RegularError>;
  org?: Maybe<Org>;
  orgs?: Maybe<Array<Maybe<Org>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type OrgUpdateInput = {
  adminId?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  homePage?: InputMaybe<Scalars["String"]>;
  address?: InputMaybe<Scalars["String"]>;
  orgName?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
};

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]>;
  hasMore?: Maybe<Scalars["Boolean"]>;
  limit?: Maybe<Scalars["Int"]>;
};

export type Query = {
  __typename?: "Query";
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
  treeId: Scalars["String"];
};

export type QueryGetInquiriesWithStatusArgs = {
  endCursor?: InputMaybe<Scalars["String"]>;
  limit: Scalars["Int"];
  orgId: Scalars["String"];
  status?: InputMaybe<InquiryStatus>;
};

export type QueryGetInquiryArgs = {
  inquiryId: Scalars["String"];
};

export type QueryGetMessagesByTreeIdArgs = {
  treeId: Scalars["String"];
};

export type QueryGetOrgPrivateInfoByIdAndCookieArgs = {
  orgId: Scalars["String"];
};

export type QueryGetOrgPublicInfoByIdArgs = {
  orgId: Scalars["String"];
};

export type QueryGetUserByIdArgs = {
  userId: Scalars["String"];
};

export type QueryGetUserByIdWithOrgArgs = {
  userId: Scalars["String"];
};

export type QueryHogeArgs = {
  id: Scalars["ID"];
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type QueryNodesArgs = {
  ids: Array<InputMaybe<Scalars["ID"]>>;
};

export type RegisterUserPayload = {
  __typename?: "RegisterUserPayload";
  user: User;
};

export type RegularError = {
  __typename?: "RegularError";
  invalidField?: Maybe<Array<Scalars["String"]>>;
  message: Scalars["String"];
};

export type RegularPayload = {
  __typename?: "RegularPayload";
  message?: Maybe<Scalars["String"]>;
  result?: Maybe<Scalars["Boolean"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  dialogPosted?: Maybe<Dialog>;
};

export type User = Node & {
  __typename?: "User";
  avatar?: Maybe<Scalars["String"]>;
  belongBases?: Maybe<Array<Base>>;
  belongOrgs?: Maybe<Array<Org>>;
  description?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  heroImage?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  messages?: Maybe<Array<Message>>;
  name: Scalars["String"];
  role?: Maybe<UserRole>;
  selfIntro?: Maybe<Scalars["String"]>;
};

export type UserPayload = {
  __typename?: "UserPayload";
  error?: Maybe<RegularError>;
  pageInfo?: Maybe<PageInfo>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export enum UserRole {
  Client = "CLIENT",
  Expert = "EXPERT",
  Visitor = "VISITOR",
}

export type RegisterUserInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Base: ResolverTypeWrapper<Base>;
  BasePayload: ResolverTypeWrapper<BasePayload>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Dialog: ResolverTypeWrapper<Dialog>;
  DialogPayload: ResolverTypeWrapper<DialogPayload>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Hoge: ResolverTypeWrapper<HogeModel>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Inquiry: ResolverTypeWrapper<Inquiry>;
  InquiryCategory: InquiryCategory;
  InquiryPayload: ResolverTypeWrapper<InquiryPayload>;
  InquiryStatus: InquiryStatus;
  InquiryTree: ResolverTypeWrapper<InquiryTree>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Message: ResolverTypeWrapper<Message>;
  MessagePayload: ResolverTypeWrapper<MessagePayload>;
  MessageStatus: MessageStatus;
  MessageTree: ResolverTypeWrapper<MessageTree>;
  Mutation: ResolverTypeWrapper<{}>;
  Node:
    | ResolversTypes["Base"]
    | ResolversTypes["Dialog"]
    | ResolversTypes["Inquiry"]
    | ResolversTypes["InquiryTree"]
    | ResolversTypes["Message"]
    | ResolversTypes["MessageTree"]
    | ResolversTypes["Org"]
    | ResolversTypes["User"];
  Org: ResolverTypeWrapper<Org>;
  OrgPayload: ResolverTypeWrapper<OrgPayload>;
  OrgUpdateInput: OrgUpdateInput;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  RegisterUserPayload: ResolverTypeWrapper<RegisterUserPayload>;
  RegularError: ResolverTypeWrapper<RegularError>;
  RegularPayload: ResolverTypeWrapper<RegularPayload>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  UserPayload: ResolverTypeWrapper<UserPayload>;
  UserRole: UserRole;
  registerUserInput: RegisterUserInput;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Base: Base;
  BasePayload: BasePayload;
  Boolean: Scalars["Boolean"];
  Dialog: Dialog;
  DialogPayload: DialogPayload;
  Float: Scalars["Float"];
  Hoge: HogeModel;
  ID: Scalars["ID"];
  Inquiry: Inquiry;
  InquiryPayload: InquiryPayload;
  InquiryTree: InquiryTree;
  Int: Scalars["Int"];
  Message: Message;
  MessagePayload: MessagePayload;
  MessageTree: MessageTree;
  Mutation: {};
  Node:
    | ResolversParentTypes["Base"]
    | ResolversParentTypes["Dialog"]
    | ResolversParentTypes["Inquiry"]
    | ResolversParentTypes["InquiryTree"]
    | ResolversParentTypes["Message"]
    | ResolversParentTypes["MessageTree"]
    | ResolversParentTypes["Org"]
    | ResolversParentTypes["User"];
  Org: Org;
  OrgPayload: OrgPayload;
  OrgUpdateInput: OrgUpdateInput;
  PageInfo: PageInfo;
  Query: {};
  RegisterUserPayload: RegisterUserPayload;
  RegularError: RegularError;
  RegularPayload: RegularPayload;
  String: Scalars["String"];
  Subscription: {};
  User: User;
  UserPayload: UserPayload;
  registerUserInput: RegisterUserInput;
}>;

export type BaseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Base"] = ResolversParentTypes["Base"]
> = ResolversObject<{
  baseOwner?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  members?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BasePayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["BasePayload"] = ResolversParentTypes["BasePayload"]
> = ResolversObject<{
  base?: Resolver<Maybe<ResolversTypes["Base"]>, ParentType, ContextType>;
  error?: Resolver<
    Maybe<ResolversTypes["RegularError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DialogResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Dialog"] = ResolversParentTypes["Dialog"]
> = ResolversObject<{
  base?: Resolver<Maybe<ResolversTypes["Base"]>, ParentType, ContextType>;
  dialogContent?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DialogPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DialogPayload"] = ResolversParentTypes["DialogPayload"]
> = ResolversObject<{
  dialog?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Dialog"]>>>,
    ParentType,
    ContextType
  >;
  error?: Resolver<
    Maybe<ResolversTypes["RegularError"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type HogeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Hoge"] = ResolversParentTypes["Hoge"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Inquiry"] = ResolversParentTypes["Inquiry"]
> = ResolversObject<{
  category?: Resolver<
    Maybe<ResolversTypes["InquiryCategory"]>,
    ParentType,
    ContextType
  >;
  content?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  inquiryStatus?: Resolver<
    Maybe<ResolversTypes["InquiryStatus"]>,
    ParentType,
    ContextType
  >;
  sender?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  tree?: Resolver<
    Maybe<ResolversTypes["InquiryTree"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InquiryPayload"] = ResolversParentTypes["InquiryPayload"]
> = ResolversObject<{
  error?: Resolver<
    Maybe<ResolversTypes["RegularError"]>,
    ParentType,
    ContextType
  >;
  inquiries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Inquiry"]>>>,
    ParentType,
    ContextType
  >;
  inquiry?: Resolver<Maybe<ResolversTypes["Inquiry"]>, ParentType, ContextType>;
  inquiryTree?: Resolver<
    Maybe<ResolversTypes["InquiryTree"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InquiryTreeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["InquiryTree"] = ResolversParentTypes["InquiryTree"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  treedInquiry?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Inquiry"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Message"] = ResolversParentTypes["Message"]
> = ResolversObject<{
  content?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  messageStatus?: Resolver<
    Maybe<ResolversTypes["MessageStatus"]>,
    ParentType,
    ContextType
  >;
  receiver?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  tree?: Resolver<
    Maybe<ResolversTypes["MessageTree"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessagePayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MessagePayload"] = ResolversParentTypes["MessagePayload"]
> = ResolversObject<{
  error?: Resolver<
    Maybe<ResolversTypes["RegularError"]>,
    ParentType,
    ContextType
  >;
  message?: Resolver<Maybe<ResolversTypes["Message"]>, ParentType, ContextType>;
  messageTree?: Resolver<
    Maybe<ResolversTypes["MessageTree"]>,
    ParentType,
    ContextType
  >;
  messages?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Message"]>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MessageTreeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MessageTree"] = ResolversParentTypes["MessageTree"]
> = ResolversObject<{
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  treedMessage?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Message"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  acceptJoinOrg?: Resolver<
    Maybe<ResolversTypes["OrgPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAcceptJoinOrgArgs, "requestUserId" | "requestedOrgId">
  >;
  changePassword?: Resolver<
    Maybe<ResolversTypes["RegularPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationChangePasswordArgs, "currentPass" | "newPass">
  >;
  deleteUser?: Resolver<
    Maybe<ResolversTypes["RegularPayload"]>,
    ParentType,
    ContextType
  >;
  forgetPassword?: Resolver<
    Maybe<ResolversTypes["RegularPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationForgetPasswordArgs, "email">
  >;
  login?: Resolver<
    Maybe<ResolversTypes["UserPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "email" | "password">
  >;
  logout?: Resolver<
    Maybe<ResolversTypes["RegularPayload"]>,
    ParentType,
    ContextType
  >;
  postDialog?: Resolver<
    Maybe<ResolversTypes["DialogPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationPostDialogArgs, "dialogContent" | "id">
  >;
  registerOrg?: Resolver<
    Maybe<ResolversTypes["OrgPayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationRegisterOrgArgs,
      "email" | "address" | "name" | "phoneNumber"
    >
  >;
  registerUser?: Resolver<
    ResolversTypes["RegisterUserPayload"],
    ParentType,
    ContextType,
    RequireFields<MutationRegisterUserArgs, "input">
  >;
  replyInquiry?: Resolver<
    Maybe<ResolversTypes["InquiryPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReplyInquiryArgs, "content" | "replyTargetId">
  >;
  replyMessage?: Resolver<
    Maybe<ResolversTypes["MessagePayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationReplyMessageArgs, "content" | "replyTargetId">
  >;
  requestJoinOrg?: Resolver<
    Maybe<ResolversTypes["OrgPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationRequestJoinOrgArgs, "orgId">
  >;
  sendInquiry?: Resolver<
    Maybe<ResolversTypes["InquiryPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSendInquiryArgs, "orgId" | "receiverId" | "textInput">
  >;
  sendMessage?: Resolver<
    Maybe<ResolversTypes["MessagePayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSendMessageArgs, "receiverId" | "textInput">
  >;
  updateInquiryStatus?: Resolver<
    Maybe<ResolversTypes["InquiryPayload"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationUpdateInquiryStatusArgs,
      "inquiryId" | "inquiryStatus"
    >
  >;
  updateOrg?: Resolver<
    Maybe<ResolversTypes["OrgPayload"]>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateOrgArgs, "orgId">
  >;
  updateUser?: Resolver<
    Maybe<ResolversTypes["UserPayload"]>,
    ParentType,
    ContextType,
    Partial<MutationUpdateUserArgs>
  >;
}>;

export type NodeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Node"] = ResolversParentTypes["Node"]
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    | "Base"
    | "Dialog"
    | "Inquiry"
    | "InquiryTree"
    | "Message"
    | "MessageTree"
    | "Org"
    | "User",
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
}>;

export type OrgResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Org"] = ResolversParentTypes["Org"]
> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  homePage?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  inquiries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Inquiry"]>>>,
    ParentType,
    ContextType
  >;
  latitude?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  members?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
  orgName?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  phoneNumber?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OrgPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["OrgPayload"] = ResolversParentTypes["OrgPayload"]
> = ResolversObject<{
  error?: Resolver<
    Maybe<ResolversTypes["RegularError"]>,
    ParentType,
    ContextType
  >;
  org?: Resolver<Maybe<ResolversTypes["Org"]>, ParentType, ContextType>;
  orgs?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Org"]>>>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = ResolversObject<{
  endCursor?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  hasMore?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  limit?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  getInquiriesByTreeIdAndCookie?: Resolver<
    Maybe<ResolversTypes["InquiryPayload"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetInquiriesByTreeIdAndCookieArgs, "treeId">
  >;
  getInquiriesWithStatus?: Resolver<
    Maybe<ResolversTypes["InquiryPayload"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetInquiriesWithStatusArgs, "limit" | "orgId">
  >;
  getInquiry?: Resolver<
    Maybe<ResolversTypes["InquiryPayload"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetInquiryArgs, "inquiryId">
  >;
  getMessagesByCookie?: Resolver<
    Maybe<ResolversTypes["MessagePayload"]>,
    ParentType,
    ContextType
  >;
  getMessagesByTreeId?: Resolver<
    Maybe<ResolversTypes["MessagePayload"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetMessagesByTreeIdArgs, "treeId">
  >;
  getOrgPrivateInfoByIdAndCookie?: Resolver<
    Maybe<ResolversTypes["OrgPayload"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetOrgPrivateInfoByIdAndCookieArgs, "orgId">
  >;
  getOrgPublicInfoById?: Resolver<
    Maybe<ResolversTypes["OrgPayload"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetOrgPublicInfoByIdArgs, "orgId">
  >;
  getOrgs?: Resolver<
    Maybe<ResolversTypes["OrgPayload"]>,
    ParentType,
    ContextType
  >;
  getOrgsByMemberCookie?: Resolver<
    Maybe<ResolversTypes["OrgPayload"]>,
    ParentType,
    ContextType
  >;
  getUserByCookie?: Resolver<
    Maybe<ResolversTypes["UserPayload"]>,
    ParentType,
    ContextType
  >;
  getUserById?: Resolver<
    Maybe<ResolversTypes["UserPayload"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserByIdArgs, "userId">
  >;
  getUserByIdWithOrg?: Resolver<
    Maybe<ResolversTypes["UserPayload"]>,
    ParentType,
    ContextType,
    RequireFields<QueryGetUserByIdWithOrgArgs, "userId">
  >;
  getUsers?: Resolver<ResolversTypes["UserPayload"], ParentType, ContextType>;
  hoge?: Resolver<
    Maybe<ResolversTypes["Hoge"]>,
    ParentType,
    ContextType,
    RequireFields<QueryHogeArgs, "id">
  >;
  node?: Resolver<
    Maybe<ResolversTypes["Node"]>,
    ParentType,
    ContextType,
    RequireFields<QueryNodeArgs, "id">
  >;
  nodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Node"]>>>,
    ParentType,
    ContextType,
    RequireFields<QueryNodesArgs, "ids">
  >;
}>;

export type RegisterUserPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RegisterUserPayload"] = ResolversParentTypes["RegisterUserPayload"]
> = ResolversObject<{
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RegularErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RegularError"] = ResolversParentTypes["RegularError"]
> = ResolversObject<{
  invalidField?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType
  >;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RegularPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["RegularPayload"] = ResolversParentTypes["RegularPayload"]
> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  result?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"]
> = ResolversObject<{
  dialogPosted?: SubscriptionResolver<
    Maybe<ResolversTypes["Dialog"]>,
    "dialogPosted",
    ParentType,
    ContextType
  >;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  avatar?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  belongBases?: Resolver<
    Maybe<Array<ResolversTypes["Base"]>>,
    ParentType,
    ContextType
  >;
  belongOrgs?: Resolver<
    Maybe<Array<ResolversTypes["Org"]>>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  heroImage?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  messages?: Resolver<
    Maybe<Array<ResolversTypes["Message"]>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes["UserRole"]>, ParentType, ContextType>;
  selfIntro?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserPayloadResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["UserPayload"] = ResolversParentTypes["UserPayload"]
> = ResolversObject<{
  error?: Resolver<
    Maybe<ResolversTypes["RegularError"]>,
    ParentType,
    ContextType
  >;
  pageInfo?: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
  user?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  users?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["User"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Base?: BaseResolvers<ContextType>;
  BasePayload?: BasePayloadResolvers<ContextType>;
  Dialog?: DialogResolvers<ContextType>;
  DialogPayload?: DialogPayloadResolvers<ContextType>;
  Hoge?: HogeResolvers<ContextType>;
  Inquiry?: InquiryResolvers<ContextType>;
  InquiryPayload?: InquiryPayloadResolvers<ContextType>;
  InquiryTree?: InquiryTreeResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessagePayload?: MessagePayloadResolvers<ContextType>;
  MessageTree?: MessageTreeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Org?: OrgResolvers<ContextType>;
  OrgPayload?: OrgPayloadResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterUserPayload?: RegisterUserPayloadResolvers<ContextType>;
  RegularError?: RegularErrorResolvers<ContextType>;
  RegularPayload?: RegularPayloadResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserPayload?: UserPayloadResolvers<ContextType>;
}>;
