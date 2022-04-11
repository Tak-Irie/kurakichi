import { Either, left, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  NotExistError,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { Base, IBaseRepo } from "../../domain";
import { createDTOBaseFromDomain, DTOBase } from "../DTOBase";

type createBaseArg = { adminId: string };

type createBaseResponse = Either<
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOBase>
>;

export class CreateBaseUsecase
  implements IUsecase<createBaseArg, Promise<createBaseResponse>>
{
  constructor(private BaseRepo: IBaseRepo) {
    this.BaseRepo = BaseRepo;
  }
  public async execute(arg: createBaseArg): Promise<createBaseResponse> {
    try {
      const isId = UniqueEntityId.createFromArg({ id: arg.adminId });
      if (isId === false) return left(new InvalidInputValueError("wip", ""));

      const base = Base.create({
        id: UniqueEntityId.createULID(),
        baseOwner: isId,
        members: [isId],
      });

      const dbResult = await this.BaseRepo.registerBase(base.getValue());
      if (dbResult === false) return left(new StoreConnectionError(""));

      const dtoBase = createDTOBaseFromDomain(dbResult);
      return right(Result.success<DTOBase>(dtoBase));
    } catch (err) {
      return left(new UnexpectedError(""));
    }
  }
}
