import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";
import { Base } from "./Base";

export interface IBaseRepo {
  getSecureBase(baseId: UniqueEntityId): Promise<Base | false>;
  registerSecureBase(secureBase: Base): Promise<Base | false>;
}
