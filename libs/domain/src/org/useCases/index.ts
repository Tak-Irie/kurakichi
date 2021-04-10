import { OrgRepo } from '../infra/OrgRepo';

import { RegisterOrgUseCase } from './registerOrg//RegisterOrgUseCase';
import { GetOrgsUseCase } from './getOrgs/getOrgsUseCase';
import { GetOrgUseCase } from './getOrg/getOrgUseCase';
import { AcceptJoinOrgUseCase } from './acceptJoinOrg/acceptJoinOrgUseCase';
import { RequestJoinOrgUseCase } from './requestJoinOrg/requestJoinOrgUseCase';

const orgRepo = new OrgRepo();

export const useRegisterOrgUseCase = new RegisterOrgUseCase(orgRepo);
export const useGetOrgsUseCase = new GetOrgsUseCase(orgRepo);
export const useGetOrgUseCase = new GetOrgUseCase(orgRepo);
export const useAcceptJoinOrgUseCase = new AcceptJoinOrgUseCase(orgRepo);
export const useRequestJoinOrgUseCase = new RequestJoinOrgUseCase(orgRepo);
