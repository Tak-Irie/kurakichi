import { Result } from "../../shared/core";
import { ValueObject } from "../../shared/domain/ValueObject";

export type MessageStatusUnion = "READ" | "UNREAD" | "DRAFT";

type MessageCategoryProps = {
  status: MessageStatusUnion;
};

export class MessageStatus extends ValueObject<MessageCategoryProps> {
  private constructor(readonly props: MessageCategoryProps) {
    super(props);
  }
  // FIXME:
  public getValue(): MessageStatusUnion {
    return this.props.status;
  }
  public static create(): Result<MessageStatus> {
    const messageStatus = new MessageStatus({
      status: "UNREAD",
    });
    return Result.success<MessageStatus>(messageStatus);
  }

  public static restoreFromRepo(status: MessageStatusUnion): MessageStatus {
    return new MessageStatus({ status });
  }
}
