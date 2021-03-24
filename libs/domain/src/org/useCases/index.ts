import { OrgRepo } from '../infra/OrgRepo';

import { RegisterOrgUseCase } from './registerOrg//RegisterOrgUseCase';

const orgRepo = new OrgRepo();

export const useRegisterOrgUseCase = new RegisterOrgUseCase(orgRepo);
