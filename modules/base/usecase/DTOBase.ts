import { Base } from "../domain";

export type DTOBase = {
  id: string;
  baseOwner: string;
  members: string[];
};

export const createDTOBaseFromDomain = (base: Base): DTOBase => {
  const { id, baseOwner, members } = base.getProps();
  return {
    id: id.getId(),
    baseOwner: baseOwner.getId(),
    members: members.map((member) => member.getId()),
  };
};
