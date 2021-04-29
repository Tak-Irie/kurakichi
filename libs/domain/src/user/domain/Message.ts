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
  treeId: UniqueEntityId;
}

export type MessagePrimitive = {
  id: string;
  content: string;
  status: MessageStatusUnion;
  sender: string;
  receiver: string;
  sentAt: number;
  treeId: string;
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

  public static create(
    props: Omit<MessageProps, 'id' | 'status' | 'treeId' | 'sentAt'>,
  ): Result<Message> {
    const message = new Message({
      ...props,
      id: UniqueEntityId.create(),
      status: MessageStatus.create().getValue(),
      sentAt: UnixTime.create().getValue(),
      treeId: UniqueEntityId.create(),
    });
    // Message.addDomainEvent(new _EntityCreated(Message));
    return Result.success<Message>(message);
  }

  public static createResponse(origin: Message, response: MessageContent): Result<Message> {
    const { receiver, sender, treeId } = origin.getProps();

    const message = new Message({
      id: UniqueEntityId.create(),
      content: response,
      receiver: sender,
      sender: receiver,
      status: MessageStatus.create().getValue(),
      sentAt: UnixTime.create().getValue(),
      treeId,
    });
    // Message.addDomainEvent(new _EntityCreated(Message));
    return Result.success<Message>(message);
  }

  public static restoreFromRepo(storedMessage: MessagePrimitive): Message {
    const { content, id, treeId, receiver, sender, sentAt, status } = storedMessage;

    return new Message({
      id: UniqueEntityId.restoreFromRepo(id),
      content: MessageContent.restoreFromRepo(content),
      status: MessageStatus.restoreFromRepo(status),
      receiver: UniqueEntityId.restoreFromRepo(receiver),
      sender: UniqueEntityId.restoreFromRepo(sender),
      sentAt: UnixTime.restoreFromRepo(sentAt),
      treeId: UniqueEntityId.restoreFromRepo(treeId),
    });
  }

  public static restoreArrayFromRepo(storedMessages: MessagePrimitive[]): Message[] {
    return storedMessages.map((message) => this.restoreFromRepo(message));
  }
}
