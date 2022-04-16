import {
    Message as StoredMessage,
    MessageTree as StoredMessageTree
} from '@kurakichi/prisma/src';
import { Message } from '../domain';

type MessageTree = StoredMessageTree & {
  messages: StoredMessage[];
};

export class MessageMapper {
  public static ToDomain(storedMessage: StoredMessage): Message {
    const { sentAt, id, receiverId, senderId, status, text, messageTreeId } =
      storedMessage;
    const MessageResult = Message.restoreFromRepo({
      id,
      content: text,
      status: status,
      sender: senderId,
      receiver: receiverId,
      sentAt: sentAt,
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
      text: content.getText(),
      status: status.getValue(),
      senderId: sender.getId(),
      receiverId: receiver.getId(),
      sentAt: sentAt.getTime(),
      messageTreeId: treeId.getId(),
    };
  }
}
