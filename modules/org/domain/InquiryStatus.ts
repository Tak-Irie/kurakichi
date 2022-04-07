import { Result } from '../../shared/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

export type InquiryStatusUnion = 'DONE' | 'WORKING' | 'UNREAD' | 'DRAFT';

type InquiryStatusProps = {
  status: InquiryStatusUnion;
};

export class InquiryStatus extends ValueObject<InquiryStatusProps> {
  private constructor(readonly props: InquiryStatusProps) {
    super(props);
  }
  // FIXME:
  public getValue(): InquiryStatusUnion {
    return this.props.status;
  }
  public static create(props: InquiryStatusProps): Result<InquiryStatus> {
    const inquiryStatus = new InquiryStatus({
      ...props,
    });
    return Result.success<InquiryStatus>(inquiryStatus);
  }

  // temp
  public static _create(status: string): Result<InquiryStatus> {
    let _status: InquiryStatus | undefined;
    switch (status) {
      case 'DONE':
        _status = new InquiryStatus({ status: 'DONE' });
        break;
      case 'WORKING':
        _status = new InquiryStatus({ status: 'WORKING' });
        break;
      case 'UNREAD':
        _status = new InquiryStatus({ status: 'UNREAD' });
        break;
      case 'DRAFT':
        _status = new InquiryStatus({ status: 'DRAFT' });
        break;
      default:
        _status = undefined;
    }
    if (_status === undefined) {
      return Result.fail<InquiryStatus>(status);
    }
    return Result.success<InquiryStatus>(_status);
  }

  public static restoreFromRepo(status: InquiryStatusUnion): InquiryStatus {
    return new InquiryStatus({ status });
  }
}
