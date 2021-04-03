import { Entity } from '../../shared';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Result } from '../../shared/Result';
import { MessageContent } from './MessageContent';

interface MessageProps {
  id: UniqueEntityId;
  content: MessageContent;
  sender: UniqueEntityId;
  receiver: UniqueEntityId;
}

export class Message extends Entity<MessageProps> {
  constructor(readonly props: MessageProps) {
    super(props);
  }
  public getId(): string {
    return this.getProps().id.getId();
  }

  public getContent(): string {
    return this.getProps().content.getText();
  }

  public static create(props: MessageProps): Result<Message> {
    const _Message = new Message({
      ...props,
    });
    // Message.addDomainEvent(new _EntityCreated(Message));
    return Result.success<Message>(_Message);
  }
}
