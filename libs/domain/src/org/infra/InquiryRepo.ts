import { PrismaClient } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { IInquiryRepo, Inquiry } from '../domain';
import { InquiryMapper } from './InquiryMapper';

export class InquiryRepo implements IInquiryRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async registerInquiry(inquiry: Inquiry): Promise<Inquiry | false> {
    const {
      category,
      id,
      inquiryTreeId,
      receiverId,
      senderId,
      sentAt,
      status,
      text,
    } = InquiryMapper.toStore(inquiry);
    const result = await this.prisma.inquiry.create({
      data: {
        id,
        category,
        sentAt,
        status,
        text,
        receiver: { connect: { id: receiverId } },
        sender: { connect: { id: senderId } },
        tree: { create: { id: inquiryTreeId } },
      },
    });
    if (result == undefined) return false;
    return inquiry;
  }

  async getInquiry(id: UniqueEntityId): Promise<Inquiry | false> {
    const result = await this.prisma.inquiry.findUnique({ where: { id: id.getId() } });
    if (result == undefined) return false;

    const domainInquiry = InquiryMapper.ToDomain(result);

    return domainInquiry;
  }

  async getInquiries(id: UniqueEntityId): Promise<Inquiry[] | false> {
    const result = await this.prisma.inquiry.findMany({ where: { receiver: { id: id.getId() } } });
    if (result == undefined) return false;
    const domainInquiries = InquiryMapper.ArrayToDomain(result);
    return domainInquiries;
  }
}
