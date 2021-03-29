import { useGetOrgsUseCase, useJoinOrgsUseCase, useRegisterOrgUseCase } from '@kurakichi/domain';
import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';
import { orgToPresentation } from '../toPresentationDTO/orgToPresentation';

export const orgMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('registerOrg', {
      type: 'GeneralResponse',
      args: {
        name: nonNull(stringArg()),
        location: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        console.log('catch mutation:', context.req.session);
        const idRes = getUserIdByCookie(context);
        console.log('id:', idRes);
        if (idRes.result == false) return { result: false, message: idRes.errMessage };
        const result = await useRegisterOrgUseCase.execute({
          adminId: idRes.id,
          orgName: args.name,
          location: args.location,
        });
        console.log('res:', result);
        if (result.isLeft()) return { result: false, message: result.value.getErrorValue() };
        // FIXME:
        return { result: true, message: 'success' };
      },
    });
    t.field('joinOrg', {
      type: 'GeneralResponse',
      args: {
        orgId: nonNull(stringArg()),
      },
      resolve: async (_, args, context) => {
        const idRes = getUserIdByCookie(context);
        if (idRes.result == false) return { result: false, message: idRes.errMessage };

        const result = await useJoinOrgsUseCase.execute({
          joinUserId: idRes.id,
          joinedOrgId: args.orgId,
        });

        if (result.isLeft()) return { result: false, message: result.value.getErrorValue() };
        return { result: true };
      },
    });
  },
});

export const orgQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getOrgs', {
      type: 'OrgResponse',
      resolve: async () => {
        const result = await useGetOrgsUseCase.execute();
        // console.log('result:', result.value.getValue());
        if (result.isLeft()) return { message: result.value.getErrorValue() };
        const orgs = result.value.getValue();
        const resData = orgs.map((org) => orgToPresentation(org));

        return { message: 'success', orgs: resData };
      },
    });
  },
});
