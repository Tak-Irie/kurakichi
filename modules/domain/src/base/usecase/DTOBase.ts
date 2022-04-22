import { Base } from "../domain";

export type DTOBase = {
  id: string;
  baseOwner: string;
  fellows: string[];
  dialogs: string[];
  karte: string;
};

export const createDTOBaseFromDomain = (base: Base): DTOBase => {
  const { id, baseOwner, fellows, dialogs, karte } = base.getProps();
  return {
    id: id.getId(),
    baseOwner: baseOwner.getId(),
    fellows: fellows.map((member) => member.getId()),
    dialogs: dialogs ? dialogs.map((d) => d.getId()) : [""],
    karte: karte ? karte.getId() : "",
  };
};
