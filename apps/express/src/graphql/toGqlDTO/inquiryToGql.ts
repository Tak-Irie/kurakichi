import { Inquiry } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';

export const inquiryToGql = (inquiry: Inquiry): NexusGenFieldTypes['Inquiry'] => {
  const gqlField = {
    id: inquiry.getId(),
    content: inquiry.getContent(),
    category: inquiry.getCategory(),
    status: inquiry.getStatus(),
  };

  return gqlField;
};

export const inquiriesToGql = (inquiries: Inquiry[]): NexusGenFieldTypes['Inquiry'][] => {
  const gqlFields = inquiries.map((inquiry) => inquiryToGql(inquiry));
  return gqlFields;
};
