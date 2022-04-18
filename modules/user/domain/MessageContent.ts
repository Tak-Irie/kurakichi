import { Result } from '../../shared/core';
import { ValueObject } from '../../shared/domain/ValueObject';

type MessageContentProps = { content: string };

export class MessageContent extends ValueObject<MessageContentProps> {
  private constructor(readonly props: MessageContentProps) {
    super(props);
  }
  public getContent(): string {
    return this.props.content;
  }

  // TODO:need verification? like long, improper word/expression
  public static create(props: MessageContentProps): Result<MessageContent> {
    const _MessageContent = new MessageContent({
      ...props,
    });
    return Result.success<MessageContent>(_MessageContent);
  }

  public static restoreFromRepo(content: string): MessageContent {
    return new MessageContent({ content });
  }
}
