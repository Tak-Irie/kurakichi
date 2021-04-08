import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Org } from './Org';
import { OrgName } from './OrgName';

export interface IOrgRepo {
  // getOrgByUserId(userId: UniqueEntityId): Promise<Org | undefined>;
  confirmExistence(orgName: OrgName): Promise<boolean>;
  registerOrg(org: Org): Promise<Org | undefined>;
  requestJoinOrg(reqId: UniqueEntityId, orgId: UniqueEntityId): Promise<Org | false>;
  acceptJoinOrg(orgId: UniqueEntityId, memberId: UniqueEntityId): Promise<boolean>;
  getOrgs(): Promise<Org[]>;
  getOrgById(orgId: UniqueEntityId): Promise<Org | undefined>;
}
