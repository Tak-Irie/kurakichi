import { DTOInquiry } from "@kurakichi/modules";
import {
  Inquiry,
  InquiryCategory,
  InquiryStatus,
} from "../generated/generatedTypes";

export const dtoInquiryToGql = (dtoInquiry: DTOInquiry): Inquiry => {
  const { category, content, id, receiver, sender, status, sentAt, tree } =
    dtoInquiry;

  return {
    id,
    content,
    receiver: { id: receiver },
    sender: { id: sender },
    sentAt,
    category:
      category === "APPLICATION"
        ? InquiryCategory["Application"]
        : "COUNSEL"
        ? InquiryCategory["Counsel"]
        : "CONTACT"
        ? InquiryCategory["Contact"]
        : "INQUIRY"
        ? InquiryCategory["Inquiry"]
        : "OTHERS"
        ? InquiryCategory["Others"]
        : undefined,
    inquiryStatus:
      status === "DONE"
        ? InquiryStatus["Done"]
        : "DRAFT"
        ? InquiryStatus["Draft"]
        : "UNREAD"
        ? InquiryStatus["Unread"]
        : "WORKING"
        ? InquiryStatus["Working"]
        : undefined,
  };
};

export const dtoInquiriesToGql = (dtoInquiries: DTOInquiry[]): Inquiry[] => {
  const gqlFields = dtoInquiries.map((inquiry) => dtoInquiryToGql(inquiry));
  return gqlFields;
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
