import { Result } from '../../shared/Result';
import { ValueObject } from '../../shared/domain/ValueObject';

export type MessageStatusUnion = 'READ' | 'UNREAD' | 'DRAFT';

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
  public static create(props: MessageCategoryProps): Result<MessageStatus> {
    const messageStatus = new MessageStatus({
      ...props,
    });
    return Result.success<MessageStatus>(messageStatus);
  }

  public static restoreFromRepo(status: MessageStatusUnion): MessageStatus {
    return new MessageStatus({ status });
  }
}
