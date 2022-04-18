import { Either, left, Result, right } from '../../../shared/core';
import { UniqueEntityId } from '../../../shared/domain';
import {
  InvalidInputValueError,
  IUsecase,
  StoreConnectionError,
  UnexpectedError,
} from '../../../shared/usecase';
import { IInquiryRepo, Inquiry } from '../../domain';
import { InquiryCategory } from '../../domain/InquiryCategory';
import { InquiryContent } from '../../domain/InquiryContent';
import { InquiryStatus } from '../../domain/InquiryStatus';
import { createDTOInquiryFromDomain, DTOInquiry } from '../DTOInquiry';
import { ReceiverNotExistError } from './RegisterInquiryError';

type InquiryArg = {
  senderId: string;
  orgId: string;
  content: string;
  category: string;
};

type RegisterInquiryResponse = Either<
  | ReceiverNotExistError
  | InvalidInputValueError
  | UnexpectedError
  | StoreConnectionError
  | Result<InquiryTypes>,
  Result<DTOInquiry>
>;

type InquiryTypes = InquiryCategory | InquiryContent | InquiryStatus;

export class RegisterInquiryUsecase
  implements IUsecase<InquiryArg, Promise<RegisterInquiryResponse>>
{
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(arg: InquiryArg): Promise<RegisterInquiryResponse> {
    try {
      // console.log('registerInquiryArg:', arg);
      const { category, content, senderId, orgId } = arg;

      const senderOrErr = UniqueEntityId.createFromArg({ id: senderId });
      if (senderOrErr === false)
        return left(new InvalidInputValueError('wip', ''));
      const orgOrErr = UniqueEntityId.createFromArg({ id: orgId });
      if (orgOrErr === false)
        return left(new InvalidInputValueError('wip', ''));
      // wip, 100%success
      const _content = InquiryContent.create({ content });

      const categoryOrError = InquiryCategory.createFromArg({ category });
      if (categoryOrError === false) {
        return left(new InvalidInputValueError('wip', ''));
      }

      const inquiryOrError = Inquiry.create({
        category: categoryOrError.getValue(),
        status: InquiryStatus.create({ status: 'UNREAD' }).getValue(),
        content: _content.getValue(),
        receiver: senderOrErr,
        sender: senderOrErr,
        orgId: orgOrErr,
      });

      // FIXME:error handling
      const dbResult = await this.InquiryRepo.registerInquiry(
        inquiryOrError.getValue(),
      );

      const dtoInquiry = createDTOInquiryFromDomain(dbResult);
      return right(Result.success<DTOInquiry>(dtoInquiry));
    } catch (err) {
      if (err === Error('データベースエラー'))
        return left(new StoreConnectionError(''));
      return left(new UnexpectedError(''));
    }
  }
}
