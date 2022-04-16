import { PrismaClient } from "@kurakichi/prisma/src";
import { UniqueEntityId } from "../../shared/domain";
import { IMessageRepo, Message } from "../domain";
import { MessageMapper } from "./MessageMapper";

export class MessageRepo implements IMessageRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getMessage(messageId: UniqueEntityId): Promise<Message | false> {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId.getId() },
    });
    if (message == undefined) return false;
    // console.log('messagesRepo:', messages);
    const domainMessage = MessageMapper.ToDomain(message);

    // console.log('domainMessages:', domainMessages);
    return domainMessage;
  }
  async getMessages(userId: UniqueEntityId): Promise<Message[] | false> {
    const messages = await this.prisma.message.findMany({
      where: { receiverId: userId.getId() },
    });
    if (messages == undefined) return false;
    // console.log('messagesRepo:', messages);
    const domainMessages = messages.map((message) =>
      MessageMapper.ToDomain(message)
    );

    // console.log('domainMessages:', domainMessages);
    return domainMessages;
  }

  async registerMessage(message: Message): Promise<Message> {
    try {
      // console.log('repoMess:', message);
      const { id, receiverId, senderId, sentAt, status, text, messageTreeId } =
        MessageMapper.toStore(message);
      // console.log('data:', data);

      const result = await this.prisma.message.create({
        data: {
          id,
          text,
          status,
          sentAt,
          receiver: { connect: { id: receiverId } },
          sender: { connect: { id: senderId } },
          tree: {
            connectOrCreate: {
              where: { id: messageTreeId },
              create: { id: messageTreeId },
            },
          },
        },
      });
      // console.log('result:', result);

      return message;
    } catch (err) {
      console.log("dbError:", err);
      throw new Error("データベースエラー");
    }
  }

  async getMessageTreeById(treeId: UniqueEntityId): Promise<Message[] | false> {
    try {
      // console.log('terrId:', treeId);
      const messages = await this.prisma.messageTree.findUnique({
        where: { id: treeId.getId() },
        include: { messages: true },
      });
      // console.log('messages:', messages);
      if (messages === null) return false;

      const domainMessage = MessageMapper.treeToDomain(messages);
      return domainMessage;
    } catch (err) {
      console.log("dbError:", err);
      throw new Error("データベースエラー");
    }
  }

  async getMessagesByReceiverId(
    receiverId: UniqueEntityId
  ): Promise<Message[] | false> {
    const messages = await this.prisma.message.findMany({
      where: { receiverId: receiverId.getId() },
    });
    // console.log('messages at repo:', messages);
    if (messages == undefined) return false;

    const domainMessages = MessageMapper.arrayToDomain(messages);
    return domainMessages;
  }
}
