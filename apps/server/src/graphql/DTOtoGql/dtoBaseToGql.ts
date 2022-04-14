import { DTOBase } from "@kurakichi/modules";
import { Base } from "../generated/generatedTypes";
import { createGqlConn } from "./createConnection";

export const baseToGql = (base: DTOBase): Base => {
  const { baseOwner, id, fellows, dialogs, karte } = base;
  let _dialogs = undefined;
  let _fellows = undefined;
  if (dialogs) {
    _dialogs = createGqlConn(dialogs);
  }

  if (fellows) {
    let edges = dialogs.map((id) => {
      return { cursor: id, isBaseAdmin: id === baseOwner ? true : false };
    });
    _fellows = { pageInfo: { hasNext: false, hasPrevious: false }, edges };
  }

  return {
    id,
    fellows: _fellows,
    dialogs: _dialogs,
    karte: karte ? { id: karte } : undefined,
  };
};
