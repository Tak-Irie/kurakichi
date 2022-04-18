import { DTOInquiry, InquiryModel } from '@kurakichi/modules';
import {
  Inquiry,
  InquiryConnection,
  InquiryTree,
} from '../generated/generatedTypes';

export const dtoInquiryToGql = (dtoInquiry: DTOInquiry): Inquiry => {
  const { category, content, id, receiver, sender, status, sentAt, tree } =
    dtoInquiry;

  return {
    id,
    content,
    replier: { id: receiver },
    sender: { id: sender },
    sentAt,
    category,
    inquiryStatus: status,
  };
};

export const dtoInquiriesToGql = (dtoInquiries: DTOInquiry[]): Inquiry[] => {
  const gqlFields = dtoInquiries.map((inquiry) => dtoInquiryToGql(inquiry));
  return gqlFields;
};

export const dtoInquiriesToConnection = (
  dtoInquiries: DTOInquiry[],
): InquiryConnection => {
  const edges = dtoInquiries.map((inq) => {
    const { sender, receiver, ...rest } = inq;
    return {
      cursor: inq.id,
      node: {
        sender: { id: sender },
        receiver: { id: receiver },
        ...rest,
      },
    };
  });

  return {
    pageInfo: { hasNext: false, hasPrevious: false },
    edges,
  };
};

// temp function
export const dtoInquiriesToTree = (
  dtoInquiries: DTOInquiry[],
  treeId: string,
): InquiryTree => {
  const edges = dtoInquiries.map((inq) => {
    const { sender, receiver, ...rest } = inq;
    return {
      cursor: inq.id,
      isRoot: false,
      node: {
        sender: { id: sender },
        receiver: { id: receiver },
        ...rest,
      },
    };
  });

  return {
    id: treeId,
    leaves: {
      pageInfo: { hasNext: false, hasPrevious: false },
      edges,
    },
  };
};

export const readInquiresToConn = (
  inquiries: InquiryModel[],
): InquiryConnection => {
  const edges = inquiries.map((inq) => {
    const { sender, replier, ...rest } = inq;
    return {
      cursor: inq.id,
      isRoot: false,
      node: {
        sender,
        receiver: replier,
        ...rest,
      },
    };
  });
  return {
    pageInfo: { hasNext: false, hasPrevious: false },
    edges,
  };
};

// // TODO:temp impl
// export const dtoInquiryWithUserToGql = (
//   dtoInquiry: DTOInquiry,
//   dtoUsers: DTOUser[]
// ): NexusGenFieldTypes["Inquiry"] => {
//   const { category, content, id, receiver, sender, status, sentAt, tree } =
//     dtoInquiry;
//   const _sender = dtoUsers.find((user) => user.id === sender);

//   return {
//     id,
//     content,
//     category,
//     inquiryStatus: status,
//     sender: { ..._sender, belongOrgs: [], belongBases: [], messages: [] },
//     sentAt,
//     tree: idMapper(tree),
//   };
// };

// export const dtoInquiriesWithUserToGql = (
//   dtoInquiry: DTOInquiry[],
//   dtoUsers: DTOUser[]
// ): NexusGenFieldTypes["Inquiry"][] => {
//   return dtoInquiry.map((inquiry) =>
//     dtoInquiryWithUserToGql(inquiry, dtoUsers)
//   );
// };
