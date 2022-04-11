import { Either, left, Nothing, Result, right } from "../../../shared/core";
import { UniqueEntityId } from "../../../shared/domain";
import {
  InvalidInputValueError,
  IUsecase,
  NotExistError,
  StoreConnectionError,
  UnexpectedError,
} from "../../../shared/usecase";
import { IOrgRepo, Org } from "../../domain";
import { NotAuthorizedError } from "./UpdateOrgError";
import { createDTOOrgFromDomain, DTOOrg } from "../DTOOrg";

type UpdateOrgArg = {
  requestUserId: string;
  orgId: string;
  name: string | Nothing;
  email: string | Nothing;
  phoneNumber: string | Nothing;
  address: string | Nothing;
  description: string | Nothing;
  adminId: string | Nothing;
  avatar: string | Nothing;
  image: string | Nothing;
  homePage: string | Nothing;
};

type UpdateOrgResponse = Either<
  | NotAuthorizedError
  | NotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOOrg>
>;

export class UpdateOrgUsecase
  implements IUsecase<UpdateOrgArg, Promise<UpdateOrgResponse>>
{
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: UpdateOrgArg): Promise<UpdateOrgResponse> {
    try {
      const orgIdOrError = UniqueEntityId.createFromArg({ id: arg.orgId });
      if (orgIdOrError === false)
        return left(new InvalidInputValueError("wip", ""));

      const userIdOrError = UniqueEntityId.createFromArg({
        id: arg.requestUserId,
      });
      if (userIdOrError === false)
        return left(new InvalidInputValueError("wip", ""));

      // TODO:impl auth sys of updating org stats
      const isValid = await this.OrgRepo.confirmMemberExistence(
        orgIdOrError,
        userIdOrError
      );
      if (isValid == false) return left(new NotAuthorizedError(""));

      const currentOrg = await this.OrgRepo.getOrgById(orgIdOrError);
      if (currentOrg == false)
        return left(new NotExistError("団体が存在しません", ""));

      // delete arg.orgId;
      // delete arg.requestUserId;
      const validatedProps = Org.validateProps({ ...arg });
      const failProp = Object.values(validatedProps).filter(
        (resultProp) => resultProp.isFailure === true
      );
      if (failProp[0]) {
        return left(
          new InvalidInputValueError(
            failProp.map((prop) => prop.getErrorValue()),
            ""
          )
        );
      }

      const updatedOrg = Org.updateProps(currentOrg, {
        adminId: validatedProps.adminId?.getValue() || undefined,
        avatar: validatedProps.avatar?.getValue() || undefined,
        description: validatedProps.description?.getValue() || undefined,
        email: validatedProps.email?.getValue() || undefined,
        homePage: validatedProps.homePage?.getValue() || undefined,
        image: validatedProps.image?.getValue() || undefined,
        address: validatedProps.address?.getValue() || undefined,
        name: validatedProps.name?.getValue() || undefined,
        phoneNumber: validatedProps.phoneNumber?.getValue() || undefined,
      });

      const dbResult = await this.OrgRepo.updateOrg(updatedOrg);

      const dtoOrg = createDTOOrgFromDomain(dbResult);
      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      if (err === Error("データベースエラー"))
        return left(new StoreConnectionError(""));
      return left(new UnexpectedError(""));
    }
  }
}
