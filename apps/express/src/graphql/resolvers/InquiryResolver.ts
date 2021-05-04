import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';

import {
  useGetInquiriesUseCase,
  useGetInquiriesWithStatusByOrgIdUseCase,
  useGetInquiryUseCase,
  useRegisterInquiryUseCase,
  useGetInquiriesByTreeIdUseCase,
  useGetUsersByIdsUseCase,
  useReplyInquiryUseCase,
} from '@kurakichi/domain';
import { dtoInquiryToGql, dtoInquiriesToGql, dtoInquiriesWithUserToGql } from '../DTOtoGql';
import { returnErrorToGQL } from '../../util/returnErrorToGQL';

export const InquiryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getInquiries', {
      type: 'InquiryPayload',
      description: 'get inquiries of one Org',
      args: {
        orgId: nonNull(stringArg()),
      },
      resolve: async (_, args) => {
        const domainResponse = await useGetInquiriesUseCase.execute({ orgId: args.orgId });
        if (domainResponse.isLeft()) return returnErrorToGQL(domainResponse);

        const inquiries = domainResponse.value.getValue();
        const gqlField = dtoInquiriesToGql(inquiries);

        return { inquiries: gqlField };
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
      },
      resolve: async (_, args) => {
        const domainInquiriesOrErr = await useGetInquiriesWithStatusByOrgIdUseCase.execute({
          orgId: args.orgId,
          status: args.status,
        });
        if (domainInquiriesOrErr.isLeft()) return returnErrorToGQL(domainInquiriesOrErr);

        const gqlInquiries = dtoInquiriesToGql(domainInquiriesOrErr.value.getValue());
        return { inquiries: gqlInquiries };
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
  },
});
