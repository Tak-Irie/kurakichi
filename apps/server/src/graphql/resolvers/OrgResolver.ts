import {
  useAcceptJoinOrgUsecase,
  useGetOrgsByMemberIdUsecase,
  useGetOrgsUsecase,
  useGetOrgUsecase,
  useRegisterOrgUsecase,
  useRequestJoinOrgUsecase,
  useUpdateOrgUsecase,
} from '@kurakichi/modules';
import { ApolloContext } from '../../types';
import {
  returnErrorToGQL,
  returnNotLoggedIn,
} from '../../util/FunctionsForGqlResolver';
import { dtoOrgsToGql, dtoOrgToGql } from '../DTOtoGql';
import { Resolvers } from '../generated/generatedTypes';

export const OrgResolver: Resolvers<ApolloContext> = {
  Query: {
    getOrg: async (_, { id }) => {
      const usecaseResult = await useGetOrgUsecase.execute({ orgId: id });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const org = dtoOrgToGql(usecaseResult.value.getValue());

      return { org };
    },
    getOrgs: async () => {
      const usecaseResult = await useGetOrgsUsecase.execute();
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      // console.log('resRes:', usecaseResult.value.getValue());
      const orgs = dtoOrgsToGql(usecaseResult.value.getValue());
      return { orgs };
    },
    getOrgsInfoByMemberCookie: async (_, __, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const usecaseResult = await useGetOrgsByMemberIdUsecase.execute({
        memberId: idInCookie,
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      const orgs = dtoOrgsToGql(usecaseResult.value.getValue());

      return { orgs };
    },
  },
  Mutation: {
    registerOrg: async (_, { input }, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const usecaseResult = await useRegisterOrgUsecase.execute({
        adminId: idInCookie,
        ...input,
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      const org = dtoOrgToGql(usecaseResult.value.getValue());
      return { org };
    },
    requestJoinOrg: async (_, { orgId }, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const usecaseResult = await useRequestJoinOrgUsecase.execute({
        requestUserId: idInCookie,
        requestedOrgId: orgId,
      });
      // console.log('usecaseResult:', usecaseResult);
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const org = dtoOrgToGql(usecaseResult.value.getValue());
      return { org };
    },
    acceptJoinOrg: async (
      _,
      { input: { requestUserId, requestedOrgId } },
      { idInCookie },
    ) => {
      if (idInCookie === undefined) return returnNotLoggedIn();

      const usecaseResult = await useAcceptJoinOrgUsecase.execute({
        userId: requestUserId,
        orgId: requestedOrgId,
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const org = dtoOrgToGql(usecaseResult.value.getValue());
      return { org };
    },
    // FIXME:need separate them, implement feature of control admin
    updateOrg: async (_, { input }, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const {
        orgId,
        address,
        description,
        email,
        homePage,
        name,
        phoneNumber,
      } = input;
      const usecaseResult = await useUpdateOrgUsecase.execute({
        requestUserId: idInCookie,
        orgId,
        name: name || '',
        email: email || '',
        description: description || '',
        address: address || '',
        homePage: homePage || '',
        phoneNumber: phoneNumber || '',
        avatar: '',
        image: '',
        adminId: '',
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());

      const gqlOrg = dtoOrgToGql(usecaseResult.value.getValue());
      return { org: gqlOrg };
    },
  },
};