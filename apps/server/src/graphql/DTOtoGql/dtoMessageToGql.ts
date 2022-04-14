import { DTOMessage } from "@kurakichi/modules";
import { Message, MessageStatus } from "../generated/generatedTypes";

export const dtoMessageToGql = (message: DTOMessage): Message => {
  const { content, id, receiverId, senderId, status, sentAt, treeId } = message;
  return {
    id,
    content,
    sentAt,
    status:
      status === "DRAFT"
        ? MessageStatus["Draft"]
        : "READ"
        ? MessageStatus["Read"]
        : "SENT"
        ? MessageStatus["Sent"]
        : "UNREAD"
        ? MessageStatus["Unread"]
        : undefined,
    receiver: { id: receiverId },
    sender: { id: senderId },
  };
};

export const dtoMessagesToGql = (messages: DTOMessage[]): Message[] => {
  return messages.map((message) => dtoMessageToGql(message));
};

// export const dtoMessageWithSenderToGql = (
//   dtoMessage: DTOMessage,
//   dtoSender: DTOUser
// ): NexusGenFieldTypes["Message"] => {
//   const { content, id, receiverId, senderId, status, sentAt, treeId } =
//     dtoMessage;
//   const gqlMessage = {
//     id,
//     content,
//     messageStatus: status,
//     receiver: idMapper(receiverId),
//     sentAt,
//     sender: {
//       ...dtoSender,
//       belongOrgs: [],
//       belongSecureBases: [],
//       messages: [],
//     },
//     tree: idMapper(treeId),
//   };
//   // console.log('gqlMessage:', gqlMessage);
//   return gqlMessage;
// };

// // TODO:I need implement CQRS!
// export const dtoMessagesWithSenderToGql = (
//   dtoMessages: DTOMessage[],
//   dtoSenders: DTOUser[]
// ): NexusGenFieldTypes["Message"][] => {
//   const gqlMessages = dtoMessages.map((message) => {
//     const sender = dtoSenders.find((sender) => sender.id === message.senderId);
//     return dtoMessageWithSenderToGql(message, sender);
//   });

//   return gqlMessages;
// };
