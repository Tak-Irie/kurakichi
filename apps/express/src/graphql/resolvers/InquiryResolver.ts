import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';

import {
  useGetInquiriesUseCase,
  useGetInquiryUseCase,
  useRegisterInquiryUseCase,
} from '@kurakichi/domain';
import { inquiryToGql, inquiriesToGql } from '../toGqlDTO/inquiryToGql';
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
        const gqlField = inquiriesToGql(inquiries);

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
        const gqlField = inquiryToGql(inquiry);
        return { inquiry: gqlField };
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
        category: 'InquiryCategory',
        status: 'InquiryStatus',
      },
      resolve: async (_, args, context) => {
        console.log('arg:', args);
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const domainResponse = await useRegisterInquiryUseCase.execute({
          senderId: idOrErr,
          receiverId: args.receiverId,
          content: args.textInput,
          category: args.category,
          status: args.status,
        });

        if (domainResponse.isLeft()) return returnErrorToGQL(domainResponse);

        const gqlField = inquiryToGql(domainResponse.value.getValue());
        return { inquiry: gqlField };
      },
    });
  },
});
