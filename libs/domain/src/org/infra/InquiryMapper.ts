import { Inquiry as StoredInquiry } from '@prisma/client';
import { UniqueEntityId } from '../../shared';
import { Inquiry } from '../domain';
import { InquiryCategory } from '../domain/InquiryCategory';
import { InquiryContent } from '../domain/InquiryContent';
import { InquiryStatus } from '../domain/InquiryStatus';

export class InquiryMapper {
  public static ToDomain(storedInquiry: StoredInquiry): Inquiry {
    const { category, id, receiverId, send_flag, senderId, text, status } = storedInquiry;

    const InquiryResult = new Inquiry({
      id: new UniqueEntityId(id),
      category: InquiryCategory.create({ type: category }).getValue(),
      status: InquiryStatus.create({ status: status }).getValue(),
      content: InquiryContent.create({ text: text }).getValue(),
      receiver: new UniqueEntityId(receiverId),
      sender: new UniqueEntityId(senderId),
    });

    return InquiryResult;
  }

  public static ArrayToDomain(storedInquiries: StoredInquiry[]): Inquiry[] {
    const arrayResult = storedInquiries.map((inquiry) => InquiryMapper.ToDomain(inquiry));
    return arrayResult;
  }

  public static toStore(Inquiry: Inquiry): Omit<StoredInquiry, 'createdAt'> {
    const { category, content, id, sender, receiver, status } = Inquiry.getProps();
    return {
      id: id.getId(),
      category: category.getValue(),
      status: status.getValue(),
      senderId: sender.getId(),
      text: content.getText(),
      send_flag: true,
      receiverId: receiver.getId(),
    };
  }
}
