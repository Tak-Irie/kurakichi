import { Result } from "../../shared/core";
import { ValueObject } from "../../shared/domain/ValueObject";

type InquiryContentProps = { content: string };

export class InquiryContent extends ValueObject<InquiryContentProps> {
  private constructor(readonly props: InquiryContentProps) {
    super(props);
  }
  public getContent(): string {
    return this.props.content;
  }

  // TODO:need verification? like long, improper word/expression
  public static create(props: InquiryContentProps): Result<InquiryContent> {
    const inquiry = new InquiryContent({
      ...props,
    });
    return Result.success<InquiryContent>(inquiry);
  }
  public static restoreFromRepo(content: string): InquiryContent {
    return new InquiryContent({ content });
  }
}
