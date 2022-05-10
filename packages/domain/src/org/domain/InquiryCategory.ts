import { Guard, Result } from '../../shared/core';
import { ValueObject } from '../../shared/domain/ValueObject';

export type InquiryCategoryUnion =
  | 'COUNSEL'
  | 'INQUIRY'
  | 'CONTACT'
  | 'APPLICATION'
  | 'OTHERS';

type InquiryCategoryProps = {
  category: InquiryCategoryUnion;
};

type InquiryCategoryArg = {
  category: string;
};

export class InquiryCategory extends ValueObject<InquiryCategoryProps> {
  private constructor(readonly props: InquiryCategoryProps) {
    super(props);
  }
  // FIXME:
  public getValue(): InquiryCategoryUnion {
    return this.props.category;
  }
  public static create(props: InquiryCategoryProps): Result<InquiryCategory> {
    const inquiryCategory = new InquiryCategory({
      ...props,
    });
    return Result.success<InquiryCategory>(inquiryCategory);
  }

  public static createFromArg(arg: InquiryCategoryArg) {
    const isShort = Guard.againstAtMost(11, arg.category);
    if (isShort.succeeded === false) return false;
    const isValid = this.discriminator(arg.category);
    if (isValid === undefined) return false;
    return Result.success<InquiryCategory>(
      new InquiryCategory({ category: isValid }),
    );
  }

  public static restoreFromRepo(
    category: InquiryCategoryUnion,
  ): InquiryCategory {
    return new InquiryCategory({ category });
  }

  private static discriminator(
    category: string,
  ): InquiryCategoryUnion | undefined {
    switch (category) {
      case 'COUNSEL':
        return category;
      case 'INQUIRY':
        return category;
      case 'CONTACT':
        return category;
      case 'APPLICATION':
        return category;
      case 'OTHERS':
        return category;
      default:
        return undefined;
    }
  }
}
