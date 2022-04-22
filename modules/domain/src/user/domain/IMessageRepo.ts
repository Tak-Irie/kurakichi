import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";
import { Message } from "./Message";

export interface IMessageRepo {
  getMessage(messageId: UniqueEntityId): Promise<Message | false>;
  getMessages(userId: UniqueEntityId): Promise<Message[] | false>;
  getMessagesByReceiverId(
    receiverId: UniqueEntityId
  ): Promise<Message[] | false>;
  getMessageTreeById(treeId: UniqueEntityId): Promise<Message[] | false>;
  registerMessage(message: Message): Promise<Message>;
}
