import { Either, left, Result, right } from '../../../shared/core';
import {
  Address,
  Email,
  Geocode,
  PhoneNumber,
  UniqueEntityId,
} from '../../../shared/domain';
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from '../../../shared/usecase';
import { IOrgRepo, Org, OrgName } from '../../domain';
import { createDTOOrgFromDomain, DTOOrg } from '../DTOOrg';
import {
  AddressNotExistError,
  AlreadyRegisteredNameError,
} from './RegisterOrgError';

import { GoogleMapAPI } from '@kurakichi/third-api';

type RegisterOrgArg = {
  adminId: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
};

type RegisterOrgResponse = Either<
  | InvalidInputValueError
  | AddressNotExistError
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
      const { address, adminId, email, name, phoneNumber } = arg;

      // TODO:unify them
      const isId = UniqueEntityId.createFromArg({ id: adminId });
      if (isId === false) return left(new InvalidInputValueError('wip', ''));

      const isName = OrgName.create({ name });
      if (isName.isFailure)
        return left(new InvalidInputValueError(isName.getErrorValue(), ''));

      const isPhoneNumber = PhoneNumber.create({ phoneNumber });
      if (isPhoneNumber.isFailure)
        return left(
          new InvalidInputValueError(isPhoneNumber.getErrorValue(), ''),
        );

      const isEmail = Email.create({ email });
      if (isEmail.isFailure)
        return left(new InvalidInputValueError(isEmail.getErrorValue(), ''));

      const isAddress = Address.create({ address });
      if (isAddress.isFailure)
        return left(new InvalidInputValueError(isAddress.getErrorValue(), ''));

      const duplicateCheck = await this.OrgRepo.confirmOrgByName(
        isName.getValue(),
      );
      if (duplicateCheck) return left(new AlreadyRegisteredNameError(''));

      const geocode = await GoogleMapAPI.getGeoCodeByAddress(
        isAddress.getValue().getValue(),
      );
      if (geocode === false) return left(new AddressNotExistError(''));

      const lat = Geocode.create({ code: geocode.lat });
      const lng = Geocode.create({ code: geocode.lng });
      if (lat.isFailure || lng.isFailure)
        return left(new AddressNotExistError(''));

      const orgOrError = Org._create({
        adminId: isId,
        name: isName.getValue(),
        email: isEmail.getValue(),
        phoneNumber: isPhoneNumber.getValue(),
        address: isAddress.getValue(),
        latitude: lat.getValue(),
        longitude: lng.getValue(),
      });
      if (orgOrError.isFailure) return left(new UnexpectedError(''));

      const dbResult = await this.OrgRepo.registerOrg(orgOrError.getValue());
      if (dbResult == false) return left(new StoreConnectionError(''));

      const dtoOrg = createDTOOrgFromDomain(dbResult);
      return right(Result.success<DTOOrg>(dtoOrg));
    } catch (err) {
      return left(new UnexpectedError(''));
    }
  }
}
