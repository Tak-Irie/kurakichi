import { Result } from '../../shared/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

export type InquiryCategoryUnion = 'COUNSEL' | 'INQUIRY' | 'CONTACT' | 'APPLICATION' | 'OTHERS';

type InquiryCategoryProps = {
  type: InquiryCategoryUnion;
};

export class InquiryCategory extends ValueObject<InquiryCategoryProps> {
  private constructor(readonly props: InquiryCategoryProps) {
    super(props);
  }
  // FIXME:
  public getValue(): InquiryCategoryUnion {
    return this.props.type;
  }
  public static create(props: InquiryCategoryProps): Result<InquiryCategory> {
    const inquiryCategory = new InquiryCategory({
      ...props,
    });
    return Result.success<InquiryCategory>(inquiryCategory);
  }
  public static restoreFromRepo(category: InquiryCategoryUnion): InquiryCategory {
    return new InquiryCategory({ type: category });
  }
}
