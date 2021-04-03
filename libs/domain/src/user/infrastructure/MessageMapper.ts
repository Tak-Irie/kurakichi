import { Message as StoredMessage } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { Message, MessageContent } from '../domain';

export class MessageMapper {
  public static async ToDomain(storedMessage: StoredMessage): Promise<Message> {
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
    const rawData = {
      id: props.id.getId(),
      text: props.content.getText(),
      senderId: props.sender.getId(),
      receiverId: props.receiver.getId(),
    };

    return rawData;
  }
}
