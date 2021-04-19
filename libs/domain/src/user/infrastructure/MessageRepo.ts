import { PrismaClient } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { IMessageRepo, Message } from '../domain';
import { MessageMapper } from './MessageMapper';

export class MessageRepo implements IMessageRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async getMessages(userId: UniqueEntityId): Promise<Message[] | false> {
    const messages = await this.prisma.message.findMany({ where: { receiverId: userId.getId() } });
    if (messages == undefined) return false;
    // console.log('messagesRepo:', messages);
    const domainMessages = messages.map((message) => MessageMapper.ToDomain(message));

    // console.log('domainMessages:', domainMessages);
    return domainMessages;
  }

  async sendMessage(message: Message): Promise<Message | false> {
    // console.log('repoMess:', message);
    const { id, receiverId, status, senderId, text } = await MessageMapper.toStore(message);

    const result = await this.prisma.message.create({
      data: {
        id,
        text,
        status,
        receiver: { connect: { id: receiverId } },
        sender: { connect: { id: senderId } },
      },
    });
    if (result == undefined) return false;

    return message;
  }
}
