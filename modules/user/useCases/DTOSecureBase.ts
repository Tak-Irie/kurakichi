import { SecureBase } from "../../user copy/domain";

export type DTOSecureBase = {
  id: string;
  baseOwner: string;
  members: string[];
};

export const createDTOSecureBaseFromDomain = (
  secureBase: SecureBase
): DTOSecureBase => {
  const { id, baseOwner, members } = secureBase.getProps();
  return {
    id: id.getId(),
    baseOwner: baseOwner.getId(),
    members: members.map((member) => member.getId()),
  };
};
