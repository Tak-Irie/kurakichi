import {
  IUsecase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  UniqueEntityId,
  InvalidInputValueError,
  Geocode,
} from "../../../shared";
import { IOrgRepo, Org } from "../../domain";
import { createDTOOrgFromDomain, DTOOrg } from "../DTOOrg";
import {
  AlreadyRegisteredNameError,
  LocationNotExistError,
} from "./registerOrgError";
import { GoogleMapAPIService } from "../../../services";

type RegisterOrgArg = {
  adminId: string;
  name: string;
  location: string;
  phoneNumber: string;
  email: string;
};

type RegisterOrgResponse = Either<
  | InvalidInputValueError
  | LocationNotExistError
  | AlreadyRegisteredNameError
  | UnexpectedError
  | StoreConnectionError,
  Result<DTOOrg>
>;

export class RegisterOrgUsecase
  implements IUsecase<RegisterOrgArg, Promise<RegisterOrgResponse>>
{
  constructor(private OrgRepo: IOrgRepo) {
    this.OrgRepo = OrgRepo;
  }
  public async execute(arg: RegisterOrgArg): Promise<RegisterOrgResponse> {
    try {
      // console.log('registerOrgArg:', arg);
      const validatedProps = Org.validateProps({ ...arg });
      const failProp = Object.values(validatedProps).filter(
        (resultProp) => resultProp.isFailure === true
      );
      // console.log('failProp:', failProp);
      if (failProp[0]) {
        return left(
          new InvalidInputValueError(
            failProp.map((prop) => prop.getErrorValue())
          )
        );
      }

      const geocode = await GoogleMapAPIService.getGeoCodeByAddress(
        validatedProps.location.getValue().getValue()
      );
      if (geocode === false) return left(new LocationNotExistError());

      const lat = Geocode.create({ code: geocode.lat });
      const lng = Geocode.create({ code: geocode.lng });
      if (lat.isFailure || lng.isFailure)
        return left(new LocationNotExistError());

      const duplicateCheck = await this.OrgRepo.confirmOrgByName(
        validatedProps.name.getValue()
      );
      if (duplicateCheck) return left(new AlreadyRegisteredNameError());

      const orgOrError = Org.create({
        id: UniqueEntityId.create(),
        adminId: validatedProps.adminId.getValue(),
        name: validatedProps.name.getValue(),
        email: validatedProps.email.getValue(),
        location: validatedProps.location.getValue(),
        latitude: lat.getValue(),
        longitude: lng.getValue(),
        phoneNumber: validatedProps.phoneNumber.getValue(),
      });
      if (orgOrError.isFailure) return left(new UnexpectedError());

      const dbResult = await this.OrgRepo.registerOrg(orgOrError.getValue());
      if (dbResult == false) return left(new StoreConnectionError());

      const dtoOrg = createDTOOrgFromDomain(dbResult);
      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      return left(new UnexpectedError(err));
    }
  }
}
