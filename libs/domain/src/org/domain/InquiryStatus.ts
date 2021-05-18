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

  public static restoreFromRepo(status: InquiryStatusUnion): InquiryStatus {
    return new InquiryStatus({ status });
  }
}
