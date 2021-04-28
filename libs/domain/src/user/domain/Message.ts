import { Entity, UnixTime } from '../../shared';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Result } from '../../shared/Result';
import { MessageContent } from './MessageContent';
import { MessageStatus, MessageStatusUnion } from './MessageStatus';

interface MessageProps {
  id: UniqueEntityId;
  content: MessageContent;
  status: MessageStatus;
  sender: UniqueEntityId;
  receiver: UniqueEntityId;
  sentAt: UnixTime;
}

export type MessagePrimitive = {
  id: string;
  content: string;
  status: MessageStatusUnion;
  sender: string;
  receiver: string;
  sentAt: number;
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

  public static create(props: Omit<MessageProps, 'status' | 'sentAt'>): Result<Message> {
    const message = new Message({
      ...props,
      status: MessageStatus.create().getValue(),
      sentAt: UnixTime.create().getValue(),
    });
    // Message.addDomainEvent(new _EntityCreated(Message));
    return Result.success<Message>(message);
  }

  public static restoreFromRepo(storedMessage: MessagePrimitive): Message {
    return new Message({
      id: UniqueEntityId.restoreFromRepo(storedMessage.id),
      content: MessageContent.restoreFromRepo(storedMessage.content),
      status: MessageStatus.restoreFromRepo(storedMessage.status),
      receiver: UniqueEntityId.restoreFromRepo(storedMessage.receiver),
      sender: UniqueEntityId.restoreFromRepo(storedMessage.sender),
      sentAt: UnixTime.restoreFromRepo(storedMessage.sentAt),
    });
  }

  public static restoreArrayFromRepo(storedMessages: MessagePrimitive[]): Message[] {
    return storedMessages.map((message) => this.restoreFromRepo(message));
  }
}
