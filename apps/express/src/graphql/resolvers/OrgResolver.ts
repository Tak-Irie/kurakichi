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
        const idRes = getUserIdByCookie(context);
        if (idRes.result == false) return { result: false, message: idRes.errMessage };
        const result = await useRegisterOrgUseCase.execute({
          adminId: idRes.id,
          orgName: args.name,
          location: args.location,
        });
        if (result.isLeft) return { result: false, message: result.value.getErrorValue() };
        // FIXME:
        return { result: true, message: 'success<temp>' };
      },
    });
  },
});
