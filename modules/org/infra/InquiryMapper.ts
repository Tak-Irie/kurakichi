import { Inquiry as StoredInquiry } from '@prisma/client';
import { Inquiry } from '../domain';

export class InquiryMapper {
  public static ToDomain(storedInquiry: StoredInquiry): Inquiry {
    const {
      category,
      id,
      receiverId,
      senderId,
      text,
      status,
      sentAt,
      inquiryTreeId,
      receivedOrgId,
    } = storedInquiry;

    const InquiryResult = Inquiry.restoreFromRepo({
      id,
      category,
      status,
      content: text,
      receiver: receiverId,
      sender: senderId,
      sentAt: sentAt,
      treeId: inquiryTreeId,
      orgId: receivedOrgId,
    });

    return InquiryResult;
  }

  public static ArrayToDomain(storedInquiries: StoredInquiry[]): Inquiry[] {
    const arrayResult = storedInquiries.map((inquiry) =>
      InquiryMapper.ToDomain(inquiry),
    );
    return arrayResult;
  }

  public static toStore(Inquiry: Inquiry): StoredInquiry {
    const {
      category,
      content,
      id,
      sender,
      receiver,
      status,
      treeId,
      sentAt,
      orgId,
    } = Inquiry.getProps();
    return {
      id: id.getId(),
      category: category.getValue(),
      status: status.getValue(),
      senderId: sender.getId(),
      text: content.getText(),
      receiverId: receiver.getId(),
      sentAt: sentAt.getTime(),
      inquiryTreeId: treeId.getId(),
      receivedOrgId: orgId.getId(),
    };
  }
}
