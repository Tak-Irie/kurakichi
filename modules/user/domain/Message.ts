import { Result } from "../../shared/core";
import { Entity } from "../../shared/domain";
import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";
import { UnixTime } from "../../shared/domain/UnixTime";
import { MessageContent } from "./MessageContent";
import { MessageStatus, MessageStatusUnion } from "./MessageStatus";

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
    return this.props.id.getId();
  }

  public getContent(): string {
    return this.props.content.getText();
  }

  public getSender(): string {
    return this.props.sender.getId();
  }
  public getReceiver(): string {
    return this.props.receiver.getId();
  }

  public static create(
    props: Omit<MessageProps, "id" | "status" | "treeId" | "sentAt">
  ): Result<Message> {
    const message = new Message({
      ...props,
      id: UniqueEntityId.createULID(),
      status: MessageStatus.create().getValue(),
      sentAt: UnixTime.create().getValue(),
      treeId: UniqueEntityId.createULID(),
    });
    // Message.addDomainEvent(new _EntityCreated(Message));
    return Result.success<Message>(message);
  }

  public static createReply(
    replyTarget: Message,
    replyContent: MessageContent
  ): Result<Message> {
    const { receiver, sender, treeId } = replyTarget.props;
    const message = new Message({
      id: UniqueEntityId.createULID(),
      content: replyContent,
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
    const { content, id, treeId, receiver, sender, sentAt, status } =
      storedMessage;

    return new Message({
      id: UniqueEntityId.restoreFromRepo({ id }),
      content: MessageContent.restoreFromRepo(content),
      status: MessageStatus.restoreFromRepo(status),
      receiver: UniqueEntityId.restoreFromRepo({ id: receiver }),
      sender: UniqueEntityId.restoreFromRepo({ id: sender }),
      sentAt: UnixTime.restoreFromRepo(sentAt),
      treeId: UniqueEntityId.restoreFromRepo({ id: treeId }),
    });
  }

  public static restoreArrayFromRepo(
    storedMessages: MessagePrimitive[]
  ): Message[] {
    return storedMessages.map((message) => this.restoreFromRepo(message));
  }
}
