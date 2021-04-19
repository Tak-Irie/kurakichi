import {
  useGetOrgsUseCase,
  useGetOrgUseCase,
  useRegisterOrgUseCase,
  useAcceptJoinOrgUseCase,
  useRequestJoinOrgUseCase,
  useGetUsersByOrgIdUseCase,
  useGetInquiriesUseCase,
  useGetOrgByMemberIdUseCase,
} from '@kurakichi/domain';
import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';
import { returnErrorToGQL } from '../../util/returnErrorToGQL';
import { dtoOrgToGql, dtoUsersToGql, dtoInquiriesToGql, dtoOrgsToGql } from '../DTOtoGql';

export const orgMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('registerOrg', {
      type: 'OrgPayload',
      args: {
        name: nonNull(stringArg()),
        location: nonNull(stringArg()),
        email: nonNull(stringArg()),
        phoneNumber: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        // console.log('catch mutation:', context.req.session);
        const idOrErr = getUserIdByCookie(context);
        // console.log('id:', idOrErr);
        if (typeof idOrErr === 'object') return idOrErr;
        const orgResult = await useRegisterOrgUseCase.execute({
          adminId: idOrErr,
          orgName: args.name,
          location: args.location,
          email: args.email,
          phoneNumber: args.phoneNumber,
        });
        console.log('res:', orgResult);
        if (orgResult.isLeft()) return { error: { message: orgResult.value.getErrorValue() } };
        const gqlField = dtoOrgToGql(orgResult.value.getValue());
        return { org: gqlField };
      },
    });
    t.field('requestJoinOrg', {
      type: 'OrgPayload',
      args: {
        orgId: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        // console.log('arg:', args);
        const idOrErr = getUserIdByCookie(context);
        // console.log('id:', idOrErr);
        if (typeof idOrErr === 'object') return idOrErr;

        const result = await useRequestJoinOrgUseCase.execute({
          requestUserId: idOrErr,
          requestedOrgId: args.orgId,
        });
        // console.log('result:', result);
        if (result.isLeft()) return returnErrorToGQL(result);

        const gqlOrg = dtoOrgToGql(result.value.getValue());
        return { org: gqlOrg };
      },
    });
    t.field('acceptJoinOrg', {
      type: 'OrgPayload',
      args: {
        requestUserId: nonNull(stringArg()),
        requestedOrgId: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const orgResult = await useAcceptJoinOrgUseCase.execute({
          requestUserId: args.requestUserId,
          requestedOrgId: args.requestedOrgId,
        });
        if (orgResult.isLeft()) return returnErrorToGQL(orgResult);

        const gqlOrg = dtoOrgToGql(orgResult.value.getValue());
        return { org: gqlOrg };
      },
    });
  },
});

export const orgQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getOrgs', {
      type: 'OrgPayload',
      resolve: async () => {
        const result = await useGetOrgsUseCase.execute();
        // console.log('resRes:', result.value.getValue());
        if (result.isLeft()) return { error: { message: result.value.getErrorValue() } };

        const domainOrgs = result.value.getValue();

        const gqlOrgs = domainOrgs.map((domainOrg) => dtoOrgToGql(domainOrg));

        return { orgs: gqlOrgs };
      },
    });
    t.field('getOrg', {
      type: 'OrgPayload',
      args: { orgId: nonNull(stringArg()) },
      resolve: async (_, args) => {
        // created as microServiceQuery
        // console.log('args:', args);
        const orgId = args.orgId;
        const orgResult = await useGetOrgUseCase.execute({ orgId });
        if (orgResult.isLeft()) return returnErrorToGQL(orgResult);
        const dtoOrg = orgResult.value.getValue();
        const gqlOrg = dtoOrgToGql(dtoOrg);
        // console.log('org:', gqlOrg);

        const userResult = await useGetUsersByOrgIdUseCase.execute({ orgId });
        if (userResult.isLeft()) return returnErrorToGQL(userResult);
        const dtoUsers = userResult.value.getValue();
        const gqlUsers = dtoUsersToGql(dtoUsers);
        // console.log('users:', gqlUsers);

        const inquiryResult = await useGetInquiriesUseCase.execute({ orgId });
        if (inquiryResult.isLeft()) return returnErrorToGQL(inquiryResult);
        const dtoInquiries = inquiryResult.value.getValue();
        const gqlInquiries = dtoInquiriesToGql(dtoInquiries);
        // console.log('inquiries:', gqlInquiries);

        // console.log('getOrgPayload:', { org: gqlOrg, members: gqlUsers, inquiries: gqlInquiries });
        return { org: { ...gqlOrg, members: gqlUsers, inquiries: gqlInquiries } };
      },
    });
    t.field('getOrgsByMemberId', {
      type: 'OrgPayload',
      resolve: async (_, __, context) => {
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const useCaseResult = await useGetOrgByMemberIdUseCase.execute({ memberId: idOrErr });
        if (useCaseResult.isLeft()) return returnErrorToGQL(useCaseResult);

        const gqlOrgs = dtoOrgsToGql(useCaseResult.value.getValue());

        return { orgs: gqlOrgs };
      },
    });
  },
});
