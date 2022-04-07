import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Org } from './Org';
import { OrgName } from './OrgName';

export interface IOrgRepo {
  // getOrgByUserId(userId: UniqueEntityId): Promise<Org | undefined>;
  confirmOrgByName(orgName: OrgName): Promise<boolean>;
  registerOrg(org: Org): Promise<Org | false>;
  requestJoinOrg(reqId: UniqueEntityId, orgId: UniqueEntityId): Promise<Org | false>;
  acceptJoinOrg(orgId: UniqueEntityId, memberId: UniqueEntityId): Promise<Org | false>;
  getOrgs(): Promise<Org[]>;
  getOrgsByMemberId(memberId: UniqueEntityId): Promise<Org[] | false>;
  getOrgById(orgId: UniqueEntityId): Promise<Org | false>;
  confirmMemberExistence(orgId: UniqueEntityId, memberId: UniqueEntityId): Promise<boolean>;
  updateOrg(org: Org): Promise<Org>;
}
