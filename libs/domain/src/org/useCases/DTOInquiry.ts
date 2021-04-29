import { Inquiry } from '../domain';

export type DTOInquiry = {
  id: string;
  category: 'COUNSEL' | 'INQUIRY' | 'CONTACT' | 'APPLICATION' | 'OTHERS';
  status: 'DONE' | 'WORKING' | 'UNREAD' | 'DRAFT';
  content: string;
  sender: string;
  receiver: string;
  sentAt: string;
};

export const createDTOInquiryFromDomain = (inquiry: Inquiry): DTOInquiry => {
  const { id, category, content, receiver, sender, status, sentAt } = inquiry.getProps();
  return {
    id: id.getId(),
    category: category.getValue(),
    content: content.getText(),
    receiver: receiver.getId(),
    sender: sender.getId(),
    status: status.getValue(),
    sentAt: sentAt.getJpDate(),
  };
};

export const createDTOInquiriesFromDomain = (inquiries: Inquiry[]): DTOInquiry[] => {
  return inquiries.map((inquiry) => createDTOInquiryFromDomain(inquiry));
};
