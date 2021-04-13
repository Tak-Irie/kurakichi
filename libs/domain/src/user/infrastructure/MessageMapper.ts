import { Message as StoredMessage } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { Message, MessageContent } from '../domain';

export class MessageMapper {
  public static ToDomain(storedMessage: StoredMessage): Message {
    const MessageResult = new Message({
      id: new UniqueEntityId(storedMessage.id),
      content: new MessageContent({ text: storedMessage.text }),
      sender: new UniqueEntityId(storedMessage.senderId),
      receiver: new UniqueEntityId(storedMessage.receiverId),
    });

    return MessageResult;
  }
  public static async toStore(
    domainMessage: Message,
  ): Promise<Omit<StoredMessage, 'createdAt' | 'read_flag'>> {
    const props = domainMessage.getProps();
    return {
      id: props.id.getId(),
      text: props.content.getText(),
      // TODO:implements temp save
      send_flag: true,
      senderId: props.sender.getId(),
      receiverId: props.receiver.getId(),
    };
  }
}
