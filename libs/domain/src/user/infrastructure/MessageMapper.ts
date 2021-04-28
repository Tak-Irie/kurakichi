import { Message as StoredMessage } from '@prisma/client';
import { Message } from '../domain';

export class MessageMapper {
  public static ToDomain(storedMessage: StoredMessage): Message {
    const { sentAt, id, receiverId, senderId, status, text } = storedMessage;
    const MessageResult = Message.restoreFromRepo({
      id,
      content: text,
      status: status,
      sender: senderId,
      receiver: receiverId,
      sentAt: Number(sentAt),
    });

    return MessageResult;
  }
  public static arrayToDomain(storedMessage: StoredMessage[]): Message[] {
    return storedMessage.map((message) => MessageMapper.ToDomain(message));
  }

  public static async toStore(domainMessage: Message): Promise<Omit<StoredMessage, 'read_flag'>> {
    const props = domainMessage.getProps();
    return {
      id: props.id.getId(),
      text: props.content.getText(),
      status: props.status.getValue(),
      senderId: props.sender.getId(),
      receiverId: props.receiver.getId(),
      sentAt: BigInt(props.sentAt.getTime()),
    };
  }
}
