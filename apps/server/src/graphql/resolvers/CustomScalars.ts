import { GraphQLScalarType, Kind } from 'graphql';

const UserRoleScalar = new GraphQLScalarType({
  name: 'UserRole',
  description: 'Literal union VISITOR | CLIENT | EXPERT',
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return ast;
    }
    return null;
  },
});
const MessageStatusScalar = new GraphQLScalarType({
  name: 'MessageStatus',
  description: 'Literal Union SENT | READ | UNREAD | DRAFT',
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return ast;
    }
    return null;
  },
});
const InquiryCategoryScalar = new GraphQLScalarType({
  name: 'InquiryCategory',
  description:
    'Literal Union APPLICATION | CONTACT | COUNSEL | INQUIRY | OTHERS',
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return ast;
    }
    return null;
  },
});
const InquiryStatusScalar = new GraphQLScalarType({
  name: 'InquiryStatus',
  description: 'Literal Union DONE | DRAFT | UNREAD | WORKING',
  serialize: (value) => value,
  parseValue: (value) => value,
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) {
      return ast;
    }
    return null;
  },
});

const ScalarResolverMap = {
  UserRole: UserRoleScalar,
  MessageStatus: MessageStatusScalar,
  InquiryCategory: InquiryCategoryScalar,
  InquiryStatus: InquiryStatusScalar,
};

export { ScalarResolverMap };
