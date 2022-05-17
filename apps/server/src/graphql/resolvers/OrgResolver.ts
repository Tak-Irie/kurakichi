import {
  getOrgPrivateInfoByCookieAndId,
  getOrgPublicInfoById,
  useAcceptJoinOrgUsecase,
  useGetOrgsUsecase,
  useRegisterOrgUsecase,
  useRequestJoinOrgUsecase,
  useUpdateOrgUsecase,
} from '@kurakichi/domain';
import { GoogleMapAPI, PostcodeAPI } from '@kurakichi/third-api';
import { ApolloContext } from '../../@types/global';
import {
  returnErrorToGQL,
  returnNotLoggedIn,
} from '../../util/FunctionsForGqlResolver';
import {
  dtoOrgsToGql,
  dtoOrgToGql,
  readInquiresToConn,
  readOrgToGql,
} from '../DTOtoGql';
import { Resolvers } from '../generated/generatedTypes';

export const OrgResolver: Resolvers<ApolloContext> = {
  Query: {
    getOrg: async (_, { id }) => {
      // const usecaseResult = await useGetOrgUsecase.execute({ orgId: id });
      // if (usecaseResult.isLeft())
      //   return returnErrorToGQL(usecaseResult.value.getErrorValue());
      // const org = dtoOrgToGql(usecaseResult.value.getValue());

      // temp
      const readResult = await getOrgPublicInfoById(id);
      if (readResult === false) {
        return returnErrorToGQL('wip');
      }
      const org = readOrgToGql(readResult);
      return { __typename: 'Org', ...org };
    },
    getOrgs: async () => {
      // console.log('catch:');
      const usecaseResult = await useGetOrgsUsecase.execute();
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      // console.log('resRes:', usecaseResult.value.getValue());
      const orgs = dtoOrgsToGql(usecaseResult.value.getValue());
      return { __typename: 'Orgs', orgs };
    },
    getOrgInfoByMemberCookieAndId: async (_, { orgId }, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      // const usecaseResult = await useGetOrgsByMemberIdUsecase.execute({
      //   memberId: idInCookie,
      // });
      // if (usecaseResult.isLeft())
      //   return returnErrorToGQL(usecaseResult.value.getErrorValue());
      // const orgs = dtoOrgsToGql(usecaseResult.value.getValue());

      const result = await getOrgPrivateInfoByCookieAndId(orgId, idInCookie);
      if (result === false) return returnErrorToGQL('wip');
      const { inquiries, ...rest } = result;
      const gqlOrg = readOrgToGql(rest);
      const gqlInq = readInquiresToConn(inquiries);

      return { __typename: 'Org', inquiries: gqlInq, ...gqlOrg };
    },
    getAddressByPostcode: async (_, { postcode }) => {
      console.log('postcode:', postcode);

      const address = await PostcodeAPI.getAddressByPostcode(postcode);
      if (address === false)
        return {
          __typename: 'Errors',
          applicationError: { message: '郵便番号が存在しません' },
        };
      // const usecaseResult = await useGetAddressByPostcode.execute({ postcode });
      // // console.log('ucresult:', usecaseResult);
      // if (usecaseResult.isLeft())
      //   return {
      //     __typename: 'Errors',
      //     applicationError: { message: usecaseResult.value.getErrorValue() },
      //   };
      // console.log('ucresult:', usecaseResult.value);
      return {
        __typename: 'Address',
        address,
      };
    },
  },
  Mutation: {
    registerOrg: async (_, { input }, { idInCookie }) => {
      if (idInCookie === undefined) return returnNotLoggedIn();
      const usecaseResult = await useRegisterOrgUsecase.execute({
        adminId: idInCookie,
        MapAPI: GoogleMapAPI.getGeocodeByAddress,
        ...input,
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      const org = dtoOrgToGql(usecaseResult.value.getValue());
      return { __typename: 'Org', ...org };
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
      return { __typename: 'Org', ...org };
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
      return { __typename: 'Org', ...org };
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
        homePageUrl: homePage || '',
        phoneNumber: phoneNumber || '',
        avatarUrl: '',
        heroImageUrl: '',
        adminId: '',
      });
      if (usecaseResult.isLeft())
        return returnErrorToGQL(usecaseResult.value.getErrorValue());
      const org = dtoOrgToGql(usecaseResult.value.getValue());
      return { __typename: 'Org', ...org };
    },
  },
};
