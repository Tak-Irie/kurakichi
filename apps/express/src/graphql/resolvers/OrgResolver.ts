import {
  useGetOrgsUseCase,
  useGetOrgUseCase,
  useJoinOrgsUseCase,
  useRegisterOrgUseCase,
} from '@kurakichi/domain';
import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';
import { orgToPresentation } from '../toPresentationDTO/orgToPresentation';

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
        const result = await useRegisterOrgUseCase.execute({
          adminId: idOrErr,
          orgName: args.name,
          location: args.location,
          email: args.email,
          phoneNumber: args.phoneNumber,
        });
        // console.log('res:', result);
        if (result.isLeft()) return { error: { message: result.value.getErrorValue() } };
        // FIXME:Regular payload should be refactored
        return { org: result.value.getValue() };
      },
    });
    t.field('joinOrg', {
      type: 'OrgPayload',
      args: {
        orgId: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        console.log('arg:', args);
        const idOrErr = getUserIdByCookie(context);
        console.log('id:', idOrErr);
        if (typeof idOrErr === 'object') return idOrErr;

        const result = await useJoinOrgsUseCase.execute({
          joinUserId: idOrErr,
          joinedOrgId: args.orgId,
        });
        console.log('result:', result);
        if (result.isLeft()) return { error: { message: result.value.getErrorValue() } };
        return { org: result.value.getValue() };
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

        const gqlOrgs = domainOrgs.map((domainOrg) => orgToPresentation(domainOrg));

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
        const gqlOrg = orgToPresentation(domainOrg);

        return { org: gqlOrg };
      },
    });
  },
});
