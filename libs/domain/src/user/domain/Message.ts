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

export type MessageDTO = {
  id: string;
  content: string;
  sender: string;
  receiver: string;
};

export class Message extends Entity<MessageProps> {
  private constructor(readonly props: MessageProps) {
    super(props);
  }
  public getId(): string {
    return this.getProps().id.getId();
  }

  public getContent(): string {
    return this.getProps().content.getText();
  }

  public getSender(): string {
    return this.getProps().sender.getId();
  }
  public getReceiver(): string {
    return this.getProps().receiver.getId();
  }

  public static create(props: MessageProps): Result<Message> {
    const _Message = new Message({
      ...props,
    });
    // Message.addDomainEvent(new _EntityCreated(Message));
    return Result.success<Message>(_Message);
  }

  public static restoreFromRepo(storedMessage: MessageDTO[]): Message[] {
    return storedMessage.map(
      (message) =>
        new Message({
          id: UniqueEntityId.restoreFromRepo(message.id),
          content: MessageContent.restoreFromRepo(message.content),
          receiver: UniqueEntityId.restoreFromRepo(message.receiver),
          sender: UniqueEntityId.restoreFromRepo(message.sender),
        }),
    );
  }
}
