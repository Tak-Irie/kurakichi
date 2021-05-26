import { extendType, intArg, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';

import {
  useGetInquiriesUseCase,
  useGetInquiriesWithStatusByOrgIdUseCase,
  useGetInquiryUseCase,
  useRegisterInquiryUseCase,
  useGetInquiriesByTreeIdUseCase,
  useGetUsersByIdsUseCase,
  useReplyInquiryUseCase,
  useUpdateInquiryStatusUseCase,
} from '@kurakichi/domain';
import { dtoInquiryToGql, dtoInquiriesWithUserToGql } from '../DTOtoGql';
import { returnErrorToGQL } from '../../util/returnErrorToGQL';

export const InquiryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getInquiriesByOrgId', {
      type: 'InquiryPayload',
      description: 'get inquiries of one Org',
      args: {
        orgId: nonNull(stringArg()),
        endCursor: stringArg(),
        limit: nonNull(intArg()),
      },
      resolve: async (_, args) => {
        const limitPlusOne = args.limit + 1;
        const domainResponse = await useGetInquiriesUseCase.execute({
          orgId: args.orgId,
          limit: limitPlusOne,
          endCursor: args.endCursor,
        });
        if (domainResponse.isLeft()) return returnErrorToGQL(domainResponse);

        const dtoInquiries = domainResponse.value.getValue();
        let hasMore = true;
        if (dtoInquiries.length <= args.limit) {
          hasMore = false;
        }
        // TODO:temp
        const domainUsersOrErr = await useGetUsersByIdsUseCase.execute({
          ids: dtoInquiries.map((inquiry) => inquiry.sender),
        });
        if (domainUsersOrErr.isLeft()) return returnErrorToGQL(domainUsersOrErr);
        const dtoUsers = domainUsersOrErr.value.getValue();

        const gqlInquiries = dtoInquiriesWithUserToGql(dtoInquiries, dtoUsers);

        return {
          inquiries: gqlInquiries,
          pageInfo: { hasMore, limit: args.limit, endCursor: gqlInquiries.pop().id },
        };
      },
    });
    t.field('getInquiry', {
      type: 'InquiryPayload',
      args: {
        inquiryId: nonNull(stringArg()),
      },
      resolve: async (_, args) => {
        const domainResponse = await useGetInquiryUseCase.execute({ inquiryId: args.inquiryId });
        if (domainResponse.isLeft()) return returnErrorToGQL(domainResponse);

        const inquiry = domainResponse.value.getValue();
        const gqlField = dtoInquiryToGql(inquiry);
        return { inquiry: gqlField };
      },
    });
    t.field('getInquiriesWithStatus', {
      type: 'InquiryPayload',
      args: {
        orgId: nonNull(stringArg()),
        status: 'InquiryStatus',
        endCursor: stringArg(),
        limit: nonNull(intArg()),
      },
      resolve: async (_, args) => {
        // console.log('getInquiriesArgs:', args);
        const limitPlusOne = args.limit + 1;

        const domainInquiriesOrErr = await useGetInquiriesWithStatusByOrgIdUseCase.execute({
          orgId: args.orgId,
          status: args.status,
          endCursor: args.endCursor,
          limit: limitPlusOne,
        });
        if (domainInquiriesOrErr.isLeft()) return returnErrorToGQL(domainInquiriesOrErr);

        const dtoInquiries = domainInquiriesOrErr.value.getValue();
        let hasMore = true;
        if (dtoInquiries.length <= args.limit) {
          hasMore = false;
        }

        // TODO:temp
        const domainUsersOrErr = await useGetUsersByIdsUseCase.execute({
          ids: dtoInquiries.map((inquiry) => inquiry.sender),
        });
        if (domainUsersOrErr.isLeft()) return returnErrorToGQL(domainUsersOrErr);

        const dtoUsers = domainUsersOrErr.value.getValue();
        const gqlInquiries = dtoInquiriesWithUserToGql(dtoInquiries, dtoUsers);
        return {
          inquiries: gqlInquiries,
          pageInfo: { hasMore, limit: args.limit, endCursor: gqlInquiries.pop().id },
        };
      },
    });
    t.field('getInquiriesByTreeIdAndCookie', {
      type: 'InquiryPayload',
      args: {
        treeId: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        // console.log('queryConfirm:', args, context.req.session);
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const domainInquiriesOrErr = await useGetInquiriesByTreeIdUseCase.execute({
          treeId: args.treeId,
          requestUserId: idOrErr,
        });
        if (domainInquiriesOrErr.isLeft()) return returnErrorToGQL(domainInquiriesOrErr);

        const dtoInquiries = domainInquiriesOrErr.value.getValue();

        // TODO:temp
        const domainUsersOrErr = await useGetUsersByIdsUseCase.execute({
          ids: dtoInquiries.map((inquiry) => inquiry.sender),
        });
        if (domainUsersOrErr.isLeft()) return returnErrorToGQL(domainUsersOrErr);

        const dtoUsers = domainUsersOrErr.value.getValue();
        const gqlInquiries = dtoInquiriesWithUserToGql(dtoInquiries, dtoUsers);

        return { inquiryTree: { id: gqlInquiries[0].tree.id, treedInquiry: gqlInquiries } };
      },
    });
  },
});

export const InquiryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('sendInquiry', {
      type: 'InquiryPayload',
      args: {
        textInput: nonNull(stringArg()),
        receiverId: nonNull(stringArg()),
        orgId: nonNull(stringArg()),
        category: 'InquiryCategory',
        status: 'InquiryStatus',
      },
      resolve: async (_, args, context) => {
        // console.log('arg:', args);
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const { receiverId, textInput, category, status, orgId } = args;
        const useCaseResult = await useRegisterInquiryUseCase.execute({
          senderId: idOrErr,
          receiverId,
          content: textInput,
          category,
          status,
          orgId,
        });

        if (useCaseResult.isLeft()) return returnErrorToGQL(useCaseResult);

        const gqlField = dtoInquiryToGql(useCaseResult.value.getValue());
        return { inquiry: gqlField };
      },
    });
    t.field('replyInquiry', {
      type: 'InquiryPayload',
      args: {
        content: nonNull(stringArg()),
        replyTargetId: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const dtoInquiryOrErr = await useReplyInquiryUseCase.execute({
          replyTargetId: args.replyTargetId,
          content: args.content,
          senderId: idOrErr,
        });
        if (dtoInquiryOrErr.isLeft()) return returnErrorToGQL(dtoInquiryOrErr);

        const gqlInquiry = dtoInquiryToGql(dtoInquiryOrErr.value.getValue());
        return { inquiry: gqlInquiry };
      },
    });
    t.field('updateInquiryStatus', {
      type: 'InquiryPayload',
      args: {
        inquiryId: nonNull(stringArg()),
        inquiryStatus: nonNull('InquiryStatus'),
      },
      resolve: async (_, args, context) => {
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const dtoInquiryOrErr = await useUpdateInquiryStatusUseCase.execute({
          inquiryId: args.inquiryId,
          inquiryStatus: args.inquiryStatus,
        });
        if (dtoInquiryOrErr.isLeft()) return returnErrorToGQL(dtoInquiryOrErr);

        const gqlInquiry = dtoInquiryToGql(dtoInquiryOrErr.value.getValue());
        return { inquiry: gqlInquiry };
      },
    });
  },
});
