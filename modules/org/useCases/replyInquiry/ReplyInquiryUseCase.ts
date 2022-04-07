import {
  IUseCase,
  Either,
  left,
  right,
  Result,
  StoreConnectionError,
  UnexpectedError,
  InvalidInputValueError,
  UniqueEntityId,
} from '../../../shared';
import { IInquiryRepo, Inquiry, InquiryContent } from '../../domain';
import { InquiryNotExistError } from './ReplyInquiryError';
import { DTOInquiry, createDTOInquiryFromDomain } from '../DTOInquiry';

type ReplyInquiryArg = {
  replyTargetId: string;
  senderId: string;
  content: string;
};

type ReplyInquiryResponse = Either<
  InquiryNotExistError | InvalidInputValueError | UnexpectedError | StoreConnectionError,
  Result<DTOInquiry>
>;

export class ReplyInquiryUseCase
  implements IUseCase<ReplyInquiryArg, Promise<ReplyInquiryResponse>>
{
  constructor(private InquiryRepo: IInquiryRepo) {
    this.InquiryRepo = InquiryRepo;
  }
  public async execute(arg: ReplyInquiryArg): Promise<ReplyInquiryResponse> {
    try {
      // console.log('arg:', arg);
      const replyTargetIdOrErr = UniqueEntityId.reconstruct(arg.replyTargetId);
      if (replyTargetIdOrErr.isFailure)
        return left(new InvalidInputValueError(replyTargetIdOrErr.getErrorValue()));

      const senderIdOrErr = UniqueEntityId.reconstruct(arg.senderId);
      if (senderIdOrErr.isFailure)
        return left(new InvalidInputValueError(senderIdOrErr.getErrorValue()));

      const replyTarget = await this.InquiryRepo.getInquiry(replyTargetIdOrErr.getValue());
      if (replyTarget == false) return left(new InquiryNotExistError());

      const contentOrError = InquiryContent.create({ text: arg.content });
      if (contentOrError.isFailure) return left(new InvalidInputValueError('不正な内容です'));

      const reply = Inquiry.createReply(
        replyTarget,
        contentOrError.getValue(),
        senderIdOrErr.getValue(),
      );
      // console.log('replyInq:', reply);

      const dbInquiry = await this.InquiryRepo.registerInquiry(reply.getValue());

      const dtoInquiry = createDTOInquiryFromDomain(dbInquiry);
      return right(Result.success<DTOInquiry>(dtoInquiry));
    } catch (err) {
      if (err == Error('データベースエラー')) return left(new StoreConnectionError());
      return left(new UnexpectedError(err));
    }
  }
}
