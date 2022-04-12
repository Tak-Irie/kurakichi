import { Base } from "../domain";

export type DTOBase = {
  id: string;
  baseOwner: string;
  fellows: string[];
};

export const createDTOBaseFromDomain = (base: Base): DTOBase => {
  const { id, baseOwner, fellows } = base.getProps();
  return {
    id: id.getId(),
    baseOwner: baseOwner.getId(),
    fellows: fellows.map((member) => member.getId()),
  };
};
