import { PrismaClient } from "@prisma/client";
import { Nothing } from "../../shared/core";
import { UniqueEntityId } from "../../shared/domain";
import { IInquiryRepo, Inquiry } from "../domain";
import { InquiryStatus } from "../domain/InquiryStatus";
import { InquiryMapper } from "./InquiryMapper";

export class InquiryRepo implements IInquiryRepo {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async registerInquiry(inquiry: Inquiry): Promise<Inquiry> {
    try {
      const {
        category,
        id,
        inquiryTreeId,
        receiverId,
        senderId,
        sentAt,
        status,
        text,
        receivedOrgId,
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
          receivedOrg: { connect: { id: receivedOrgId } },
          tree: {
            connectOrCreate: {
              where: { id: inquiryTreeId },
              create: { id: inquiryTreeId },
            },
          },
        },
      });

      return InquiryMapper.ToDomain(result);
    } catch (err) {
      console.error("dbErr:", err);
      throw new Error("データベースエラー");
    }
  }

  async getInquiry(id: UniqueEntityId): Promise<Inquiry | false> {
    const result = await this.prisma.inquiry.findUnique({
      where: { id: id.getId() },
    });
    if (result == undefined) return false;

    const domainInquiry = InquiryMapper.ToDomain(result);

    return domainInquiry;
  }
  async getInquiryTreeById(treeId: UniqueEntityId): Promise<Inquiry[] | false> {
    const result = await this.prisma.inquiry.findMany({
      where: { tree: { id: treeId.getId() } },
    });
    if (result == undefined) return false;

    const domainInquiries = InquiryMapper.ArrayToDomain(result);

    return domainInquiries;
  }

  async getInquiriesByOrgId(
    orgId: UniqueEntityId,
    limit: number,
    endCursor: UniqueEntityId | Nothing
  ): Promise<Inquiry[] | false> {
    const isCursor = endCursor === "" ? "" : endCursor.getId();

    const result = await this.prisma.inquiry.findMany({
      orderBy: { id: "desc" },
      take: limit,
      skip: isCursor ? 1 : undefined,
      cursor: isCursor ? { id: isCursor } : undefined,
      where: { receivedOrgId: orgId.getId() },
    });
    if (result == undefined) return false;
    const domainInquiries = InquiryMapper.ArrayToDomain(result);
    return domainInquiries;
  }

  async getInquiriesWithStatusByOrgId(
    orgId: UniqueEntityId,
    status: InquiryStatus,
    limit: number,
    endCursor: UniqueEntityId | Nothing
  ): Promise<Inquiry[] | false> {
    try {
      // console.log('inqStatus,limit,orgId,cursor:', status.getValue(), limit, orgId, endCursor);
      const isCursor = endCursor === "" ? "" : endCursor.getId();

      const Inquiries = await this.prisma.inquiry.findMany({
        orderBy: { id: "desc" },
        take: limit,
        skip: isCursor ? 1 : undefined,
        cursor: isCursor ? { id: isCursor } : undefined,
        where: {
          receivedOrgId: orgId.getId(),
          AND: [{ status: status.getValue() }],
        },
      });
      if (Inquiries == undefined) return false;

      const domainInquiries = InquiryMapper.ArrayToDomain(Inquiries);

      return domainInquiries;
    } catch (err) {
      console.log("dbErr:", err);
      return false;
    }
  }
  async updateInquiryStatus(
    inquiryId: UniqueEntityId,
    inquiryStatus: InquiryStatus
  ): Promise<Inquiry> {
    try {
      const updatedInquiry = await this.prisma.inquiry.update({
        where: { id: inquiryId.getId() },
        data: {
          status: inquiryStatus.getValue(),
        },
      });

      const domainInquiry = InquiryMapper.ToDomain(updatedInquiry);
      return domainInquiry;
    } catch (err) {
      console.error("dbErr", err);
      throw Error("データベースエラー");
    }
  }
}
