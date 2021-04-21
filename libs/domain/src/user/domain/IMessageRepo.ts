import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Message } from './Message';

export interface IMessageRepo {
  getMessages(userId: UniqueEntityId): Promise<Message[] | false>;
  getMessagesByReceiverId(receiverId: UniqueEntityId): Promise<Message[] | false>;
  sendMessage(message: Message): Promise<Message | false>;
}
