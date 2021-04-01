import { OrgRepo } from '../infra/OrgRepo';

import { RegisterOrgUseCase } from './registerOrg//RegisterOrgUseCase';
import { GetOrgsUseCase } from './getOrgs/getOrgsUseCase';
import { GetOrgUseCase } from './getOrg/getOrgUseCase';

import { JoinOrgUseCase } from './joinOrg/joinOrgUseCase';

const orgRepo = new OrgRepo();

export const useRegisterOrgUseCase = new RegisterOrgUseCase(orgRepo);
export const useGetOrgsUseCase = new GetOrgsUseCase(orgRepo);
export const useGetOrgUseCase = new GetOrgUseCase(orgRepo);
export const useJoinOrgsUseCase = new JoinOrgUseCase(orgRepo);
