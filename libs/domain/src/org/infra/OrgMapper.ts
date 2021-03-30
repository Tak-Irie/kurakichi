import { Organization as StoredOrg } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { Org } from '../domain';
import { OrgLocation } from '../domain/OrgLocation';
import { OrgName } from '../domain/OrgName';

export class OrgMapper {
  public static async ToDomain(storedOrg: StoredOrg): Promise<Org> {
    const orgName = OrgName.create({ name: storedOrg.name });
    const orgLocation = OrgLocation.create({ location: storedOrg.location });

    const OrgResult = new Org({
      id: new UniqueEntityId(storedOrg.id),
      name: orgName.getValue(),
      location: orgLocation.getValue(),
      adminId: new UniqueEntityId(storedOrg.adminId),
    });

    return OrgResult;
  }

  public static async toStore(org: Org): Promise<Omit<StoredOrg, 'createdAt' | 'updatedAt'>> {
    return {
      id: org.getId(),
      name: org.getOrgName(),
      location: org.getOrgLocation(),
      adminId: org.getAdminId(),
    };
  }
}
