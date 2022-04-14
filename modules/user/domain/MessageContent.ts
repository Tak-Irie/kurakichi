import { Result } from '../../shared/core';
import { ValueObject } from '../../shared/domain/ValueObject';

type MessageContentProps = { text: string };

export class MessageContent extends ValueObject<MessageContentProps> {
  private constructor(readonly props: MessageContentProps) {
    super(props);
  }
  public getText(): string {
    return this.props.text;
  }

  // TODO:need verification? like long, improper word/expression
  public static create(props: MessageContentProps): Result<MessageContent> {
    const _MessageContent = new MessageContent({
      ...props,
    });
    return Result.success<MessageContent>(_MessageContent);
  }

  public static restoreFromRepo(text: string): MessageContent {
    return new MessageContent({ text });
  }
}
