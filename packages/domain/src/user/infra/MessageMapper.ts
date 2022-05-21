import {
  Message as StoredMessage,
  MessageTree as StoredMessageTree,
} from '@prisma/client';
import { Message } from '../domain';

type MessageTree = StoredMessageTree & {
  messages: StoredMessage[];
};

export class MessageMapper {
  public static ToDomain(storedMessage: StoredMessage): Message {
    const { sentAt, id, receiverId, senderId, status, content, messageTreeId } =
      storedMessage;
    const MessageResult = Message.restoreFromRepo({
      id,
      content,
      status,
      sender: senderId,
      receiver: receiverId,
      sentAt,
      treeId: messageTreeId,
    });

    return MessageResult;
  }
  public static arrayToDomain(storedMessage: StoredMessage[]): Message[] {
    return storedMessage.map((message) => MessageMapper.ToDomain(message));
  }

  public static treeToDomain(messageTree: MessageTree): Message[] {
    return messageTree.messages.map((message) =>
      MessageMapper.ToDomain(message),
    );
  }

  public static toStore(domainMessage: Message): StoredMessage {
    const { content, id, receiver, sender, sentAt, status, treeId } =
      domainMessage.getProps();
    return {
      id: id.getId(),
      content: content.getContent(),
      status: status.getValue(),
      senderId: sender.getId(),
      receiverId: receiver.getId(),
      sentAt: sentAt.getTime(),
      messageTreeId: treeId.getId(),
    };
  }
}
