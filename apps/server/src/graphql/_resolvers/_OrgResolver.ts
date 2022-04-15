import {
  useGetOrgsUseCase,
  useGetOrgUseCase,
  useRegisterOrgUseCase,
  useAcceptJoinOrgUseCase,
  useRequestJoinOrgUseCase,
  useGetUsersByOrgIdUseCase,
  useGetOrgsByMemberIdUseCase,
  useGetUsersByIdsUseCase,
  useUpdateOrgUseCase,
  useGetInquiriesWithStatusByOrgIdUseCase,
} from '@kurakichi/domain';
import { extendType, nonNull, stringArg } from 'nexus';
import { getUserIdByCookie } from '../../util/getUserIdByCookie';
import { returnErrorToGQL } from '../../util/returnErrorToGQL';
import {
  dtoOrgToGql,
  dtoUsersToGql,
  dtoOrgsToGqlWithUser,
  dtoInquiriesWithUserToGql,
} from '../DTOtoGql';

export const orgQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getOrgs', {
      type: 'OrgPayload',
      resolve: async () => {
        const result = await useGetOrgsUseCase.execute();
        if (result.isLeft()) return { error: { message: result.value.getErrorValue() } };
        // console.log('resRes:', result.value.getValue());

        const domainOrgs = result.value.getValue();
        const gqlOrgs = domainOrgs.map((domainOrg) => dtoOrgToGql(domainOrg));

        return { orgs: gqlOrgs };
      },
    });
    t.field('getOrgPublicInfoById', {
      type: 'OrgPayload',
      args: { orgId: nonNull(stringArg()) },
      resolve: async (_, args) => {
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

        return { org: { ...gqlOrg, members: gqlUsers } };
      },
    });
    t.field('getOrgPrivateInfoByIdAndCookie', {
      type: 'OrgPayload',
      args: { orgId: nonNull(stringArg()) },
      resolve: async (_, args, context) => {
        // console.log('args,session:', args, context.req.session);

        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const orgId = args.orgId;
        const orgResult = await useGetOrgUseCase.execute({ orgId });
        if (orgResult.isLeft()) return returnErrorToGQL(orgResult);
        const dtoOrg = orgResult.value.getValue();
        const gqlOrg = dtoOrgToGql(dtoOrg);
        // console.log('org:', gqlOrg);

        const userResult = await useGetUsersByOrgIdUseCase.execute({ orgId });
        if (userResult.isLeft()) return returnErrorToGQL(userResult);
        const dtoUsers = userResult.value.getValue();

        if (dtoUsers.some((user) => user.id === idOrErr) == false) {
          return { error: { message: 'アクセスが許可されていません' } };
        }

        const gqlUsers = dtoUsersToGql(dtoUsers);

        // console.log('users:', gqlUsers);

        const inquiryResult = await useGetInquiriesWithStatusByOrgIdUseCase.execute({
          orgId,
          limit: 20,
          status: 'UNREAD',
        });

        if (inquiryResult.isRight()) {
          const dtoInquiries = inquiryResult.value.getValue();
          // console.log('dtoInquiries:', dtoInquiries);

          if (dtoInquiries[0]) {
            const inquirySender = await useGetUsersByIdsUseCase.execute({
              ids: dtoInquiries.map((inq) => inq.sender),
            });
            if (inquirySender.isLeft()) return returnErrorToGQL(inquirySender);

            const gqlInquiries = dtoInquiriesWithUserToGql(
              dtoInquiries,
              inquirySender.value.getValue(),
            );

            // console.log('getOrgPayload:', {
            //   org: { ...gqlOrg, members: gqlUsers, inquiries: gqlInquiries },
            // });
            // console.log('getOrgPayloadMember:', gqlUsers);
            // console.log('getOrgPayloadInquiry:', gqlInquiries);

            return { org: { ...gqlOrg, members: gqlUsers, inquiries: gqlInquiries } };
          }
        }
        return { org: { ...gqlOrg, members: gqlUsers } };
      },
    });
    t.field('getOrgsByMemberCookie', {
      type: 'OrgPayload',
      resolve: async (_, __, context) => {
        // console.log('accessed by:', context.req.session);
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const domainOrgsOrErr = await useGetOrgsByMemberIdUseCase.execute({ memberId: idOrErr });
        if (domainOrgsOrErr.isLeft()) return returnErrorToGQL(domainOrgsOrErr);

        const domainOrgs = domainOrgsOrErr.value.getValue();
        const memberIds = domainOrgs.map((org) => org.members);
        const domainUsersOrErr = await useGetUsersByIdsUseCase.execute({ ids: memberIds.flat(1) });
        if (domainUsersOrErr.isLeft()) return returnErrorToGQL(domainUsersOrErr);

        const gqlOrgs = dtoOrgsToGqlWithUser(domainOrgs, domainUsersOrErr.value.getValue());

        // const gqlOrgs = dtoOrgsToGql(domainOrgsOrErr.value.getValue());
        // console.log('gqlOrgs:', gqlOrgs[0].members);

        return { orgs: gqlOrgs };
      },
    });
  },
});

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
        // console.log('catch mutation, args, context:', args, context.req.session);
        const idOrErr = getUserIdByCookie(context);
        // console.log('id:', idOrErr);
        if (typeof idOrErr === 'object') return idOrErr;

        const orgResult = await useRegisterOrgUseCase.execute({
          adminId: idOrErr,
          name: args.name,
          location: args.location,
          email: args.email,
          phoneNumber: args.phoneNumber,
        });
        // console.log('res:', orgResult);
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
    t.field('updateOrg', {
      type: 'OrgPayload',
      args: {
        orgId: nonNull(stringArg()),
        input: 'OrgUpdateInput',
      },
      resolve: async (_, args, context) => {
        const idOrErr = getUserIdByCookie(context);
        if (typeof idOrErr === 'object') return idOrErr;

        const updateResult = await useUpdateOrgUseCase.execute({
          ...args.input,
          orgId: args.orgId,
          requestUserId: idOrErr,
        });
        if (updateResult.isLeft()) return returnErrorToGQL(updateResult);

        const gqlOrg = dtoOrgToGql(updateResult.value.getValue());
        return { org: gqlOrg };
      },
    });
  },
});
