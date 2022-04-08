import { idMapper, idsMapper } from "../../util/idMapper";

export const baseToGql = (base: DTOBase): NexusGenFieldTypes["Base"] => {
  const { baseOwner, id, members } = base;
  return {
    id,
    baseOwner: idMapper(baseOwner),
    members: idsMapper(members),
  };
};
