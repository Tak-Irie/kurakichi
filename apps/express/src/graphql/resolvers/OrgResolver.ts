import {
  useGetOrgsUseCase,
  useGetOrgUseCase,
  useRegisterOrgUseCase,
  useAcceptJoinOrgUseCase,
  useRequestJoinOrgUseCase,
} from '@kurakichi/domain';
import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';
import { returnErrorToGQL } from '../../util/returnErrorToGQL';
import { dtoOrgToGql } from '../DTOtoGql';

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
        const useCaseResult = await useRegisterOrgUseCase.execute({
          adminId: idOrErr,
          orgName: args.name,
          location: args.location,
          email: args.email,
          phoneNumber: args.phoneNumber,
        });
        // console.log('res:', result);
        if (useCaseResult.isLeft())
          return { error: { message: useCaseResult.value.getErrorValue() } };
        const gqlField = dtoOrgToGql(useCaseResult.value.getValue());
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

        const useCaseResult = await useAcceptJoinOrgUseCase.execute({
          requestUserId: args.requestUserId,
          requestedOrgId: args.requestedOrgId,
        });
        if (useCaseResult.isLeft()) return returnErrorToGQL(useCaseResult);

        const gqlOrg = dtoOrgToGql(useCaseResult.value.getValue());
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
        const result = await useGetOrgUseCase.execute({ orgId: args.orgId });
        if (result.isLeft()) return { error: { message: result.value.getErrorValue() } };
        const domainOrg = result.value.getValue();
        const gqlOrg = dtoOrgToGql(domainOrg);

        return { org: gqlOrg };
      },
    });
  },
});
