import { Inquiry } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';

export const inquiryToGql = (inquiry: Inquiry): NexusGenFieldTypes['Inquiry'] => {
  return {
    id: inquiry.getId(),
    content: inquiry.getContent(),
    category: inquiry.getCategory(),
    inquiryStatus: inquiry.getStatus(),
    sender: { id: inquiry.getSender() },
  };
};

export const inquiriesToGql = (inquiries: Inquiry[]): NexusGenFieldTypes['Inquiry'][] => {
  const gqlFields = inquiries.map((inquiry) => inquiryToGql(inquiry));
  return gqlFields;
};
