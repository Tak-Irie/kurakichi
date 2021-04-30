import { DTOInquiry } from '@kurakichi/domain';
import { idMapper } from '../../util/idMapper';
import { NexusGenFieldTypes } from '../generated/nexus';

export const dtoInquiryToGql = (dtoInquiry: DTOInquiry): NexusGenFieldTypes['Inquiry'] => {
  const { category, content, id, receiver, sender, status, sentAt, tree } = dtoInquiry;

  return {
    id,
    content,
    category,
    inquiryStatus: status,
    sender: idMapper(sender),
    sentAt,
    tree: idMapper(tree),
  };
};

export const dtoInquiriesToGql = (dtoInquiries: DTOInquiry[]): NexusGenFieldTypes['Inquiry'][] => {
  const gqlFields = dtoInquiries.map((inquiry) => dtoInquiryToGql(inquiry));
  return gqlFields;
};
