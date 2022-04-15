import {
  useGetInquiriesByTreeIdUsecase,
  useGetInquiriesUsecase,
  useGetInquiryUsecase,
  useRegisterInquiryUsecase,
  useReplyInquiryUsecase,
  useUpdateInquiryStatusUsecase,
} from '@kurakichi/modules';
import { ApolloContext } from '../../types';
import {
  returnErrorToGQL,
  returnNotLoggedIn,
} from '../../util/FunctionsForGqlResolver';
import {
  dtoInquiriesToConnection,
  dtoInquiriesToTree,
  dtoInquiryToGql,
} from '../DTOtoGql';
import { Resolvers } from '../generated/generatedTypes';

export const InquiryResolver: Resolvers<ApolloContext> = {
  Query: {
    getInquiry: async (_, { inquiryId }, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const usecaseResponse = await useGetInquiryUsecase.execute({
        inquiryId,
      });
      if (usecaseResponse.isLeft())
        return returnErrorToGQL(usecaseResponse.value.getErrorValue());

      const inquiry = dtoInquiryToGql(usecaseResponse.value.getValue());
      return { inquiry };
    },
    getInquiriesByOrgId: async (_, { orgId }, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const TEMP_LIMIT = 20;
      const useCaseResult = await useGetInquiriesUsecase.execute({
        orgId,
        limit: TEMP_LIMIT,
        endCursor: '',
      });
      if (useCaseResult.isLeft())
        return returnErrorToGQL(useCaseResult.value.getErrorValue());
      const inquiries = dtoInquiriesToConnection(
        useCaseResult.value.getValue(),
      );

      return {
        inquiries,
      };
    },
    getInquiriesByTreeId: async (_, { treeId }, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const useCaseResult = await useGetInquiriesByTreeIdUsecase.execute({
        treeId,
        requestUserId: idInCookie,
      });
      if (useCaseResult.isLeft())
        return returnErrorToGQL(useCaseResult.value.getErrorValue());

      const inquiryTree = dtoInquiriesToTree(
        useCaseResult.value.getValue(),
        treeId,
      );

      return { inquiryTree };
    },
  },
  Mutation: {
    sendInquiry: async (_, { input }, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const { category, content, orgId } = input;

      const usecaseResult = await useRegisterInquiryUsecase.execute({
        senderId: idInCookie,
        content,
        category,
        orgId,
      });

      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const inquiry = dtoInquiryToGql(usecaseResult.value.getValue());
      return { inquiry };
    },
    replyInquiry: async (_, { input }, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const { content, replyTargetId } = input;
      const usecaseResult = await useReplyInquiryUsecase.execute({
        replyTargetId,
        content,
        senderId: idInCookie,
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const inquiry = dtoInquiryToGql(usecaseResult.value.getValue());
      return { inquiry };
    },
    updateInquiryStatus: async (
      _,
      { input: { inquiryId, inquiryStatus } },
      { idInCookie },
    ) => {
      if (idInCookie === undefined) return returnNotLoggedIn();

      const usecaseResult = await useUpdateInquiryStatusUsecase.execute({
        inquiryId,
        inquiryStatus,
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const inquiry = dtoInquiryToGql(usecaseResult.value.getValue());
      return { inquiry };
    },
  },
};
