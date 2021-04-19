import { Result } from '../../shared/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

export type InquiryStatusUnion = 'DONE' | 'WORKING' | 'UNREAD' | 'DRAFT';

type InquiryCategoryProps = {
  status: InquiryStatusUnion;
};

export class InquiryStatus extends ValueObject<InquiryCategoryProps> {
  private constructor(readonly props: InquiryCategoryProps) {
    super(props);
  }
  // FIXME:
  public getValue(): InquiryStatusUnion {
    return this.props.status;
  }
  public static create(props: InquiryCategoryProps): Result<InquiryStatus> {
    const inquiryCategory = new InquiryStatus({
      ...props,
    });
    return Result.success<InquiryStatus>(inquiryCategory);
  }
  public static restoreFromRepo(status: InquiryStatusUnion): InquiryStatus {
    return new InquiryStatus({ status });
  }
}
