import { useRegisterOrgUseCase } from '@kurakichi/domain';
import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';

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
        if (result.isLeft) return { result: false, message: result.value.getErrorValue() };
        // FIXME:
        return { result: true, message: 'success' };
      },
    });
  },
});
