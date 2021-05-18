import { DTOInquiry, DTOUser } from '@kurakichi/domain';
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

// TODO:temp impl
export const dtoInquiryWithUserToGql = (
  dtoInquiry: DTOInquiry,
  dtoUsers: DTOUser[],
): NexusGenFieldTypes['Inquiry'] => {
  const { category, content, id, receiver, sender, status, sentAt, tree } = dtoInquiry;
  const _sender = dtoUsers.find((user) => user.id === sender);

  return {
    id,
    content,
    category,
    inquiryStatus: status,
    sender: { ..._sender, belongOrgs: [], belongSecureBases: [], messages: [] },
    sentAt,
    tree: idMapper(tree),
  };
};

export const dtoInquiriesWithUserToGql = (
  dtoInquiry: DTOInquiry[],
  dtoUsers: DTOUser[],
): NexusGenFieldTypes['Inquiry'][] => {
  return dtoInquiry.map((inquiry) => dtoInquiryWithUserToGql(inquiry, dtoUsers));
};
