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
        return { result: true, message: '申請が成功しました、管理者の許可をお待ち下さい' };
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
        // console.log('result:', result.value.getValue());
        if (result.isLeft()) return { error: { message: result.value.getErrorValue() } };
        const org = result.value.getValue();
        const resData = org.map((org) => orgToPresentation(org));

        return { org: resData };
      },
    });
    t.field('getOrg', {
      type: 'OrgPayload',
      args: { orgId: nonNull(stringArg()) },
      resolve: async (_, args) => {
        const result = await useGetOrgUseCase.execute({ orgId: args.orgId });
        if (result.isLeft()) return { error: { massage: result.value.getErrorValue() } };
        const org = result.value.getValue();
        const res = orgToPresentation(org);

        return { org: [res] };
      },
    });
  },
});
