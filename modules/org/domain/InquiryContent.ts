import { Result } from "../../shared/core";
import { ValueObject } from "../../shared/domain/ValueObject";

type InquiryContentProps = { text: string };

export class InquiryContent extends ValueObject<InquiryContentProps> {
  private constructor(readonly props: InquiryContentProps) {
    super(props);
  }
  public getText(): string {
    return this.props.text;
  }

  // TODO:need verification? like long, improper word/expression
  public static create(props: InquiryContentProps): Result<InquiryContent> {
    const inquiry = new InquiryContent({
      ...props,
    });
    return Result.success<InquiryContent>(inquiry);
  }
  public static restoreFromRepo(text: string): InquiryContent {
    return new InquiryContent({ text });
  }
}
