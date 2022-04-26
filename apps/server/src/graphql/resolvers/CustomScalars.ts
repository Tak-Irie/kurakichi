import { GraphQLUpload } from 'graphql-upload';
import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql/type';

// FIXME: add validation
const UserRoleScalar = new GraphQLScalarType({
  name: 'UserRole',
  description: 'Literal union VISITOR | CLIENT | EXPERT',
  serialize: (value: any) => value,
  parseValue: (value: any) => value,
  parseLiteral: (ast: any) => {
    if (ast.kind === Kind.STRING) {
      return ast;
    }
    return null;
  },
});
const MessageStatusScalar = new GraphQLScalarType({
  name: 'MessageStatus',
  description: 'Literal Union SENT | READ | UNREAD | DRAFT',
  serialize: (value: any) => value,
  parseValue: (value: any) => value,
  parseLiteral: (ast: any) => {
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
  serialize: (value: any) => value,
  parseValue: (value: any) => value,
  parseLiteral: (ast: any) => {
    if (ast.kind === Kind.STRING) {
      return ast;
    }
    return null;
  },
});
const InquiryStatusScalar = new GraphQLScalarType({
  name: 'InquiryStatus',
  description: 'Literal Union DONE | DRAFT | UNREAD | WORKING',
  serialize: (value: any) => value,
  parseValue: (value: any) => value,
  parseLiteral: (ast: any) => {
    if (ast.kind === Kind.STRING) {
      return ast;
    }
    return null;
  },
});

const UploadScalar = GraphQLUpload;

const ScalarResolverMap = {
  UserRole: UserRoleScalar,
  MessageStatus: MessageStatusScalar,
  InquiryCategory: InquiryCategoryScalar,
  InquiryStatus: InquiryStatusScalar,
  Upload: UploadScalar,
};

export { ScalarResolverMap };
