import { DTOMessage, DTOUser } from '@kurakichi/domain';
import { idMapper } from '../../util/idMapper';
import { NexusGenFieldTypes } from '../generated/nexus';

export const dtoMessageToGql = (message: DTOMessage): NexusGenFieldTypes['Message'] => {
  const { content, id, receiverId, senderId, status, sentAt, treeId } = message;
  return {
    id,
    content,
    messageStatus: status,
    receiver: idMapper(receiverId),
    sender: idMapper(senderId),
    sentAt,
    tree: idMapper(treeId),
  };
};

export const dtoMessagesToGql = (messages: DTOMessage[]): NexusGenFieldTypes['Message'][] => {
  return messages.map((message) => dtoMessageToGql(message));
};

export const dtoMessageWithSenderToGql = (
  dtoMessage: DTOMessage,
  dtoSender: DTOUser,
): NexusGenFieldTypes['Message'] => {
  const { content, id, receiverId, senderId, status, sentAt, treeId } = dtoMessage;
  const gqlMessage = {
    id,
    content,
    messageStatus: status,
    receiver: idMapper(receiverId),
    sentAt,
    sender: { ...dtoSender, belongOrgs: [], belongSecureBases: [], messages: [] },
    tree: idMapper(treeId),
  };
  // console.log('gqlMessage:', gqlMessage);
  return gqlMessage;
};

// TODO:I need implement CQRS!
export const dtoMessagesWithSenderToGql = (
  dtoMessages: DTOMessage[],
  dtoSenders: DTOUser[],
): NexusGenFieldTypes['Message'][] => {
  const gqlMessages = dtoMessages.map((message) => {
    const sender = dtoSenders.find((sender) => sender.id === message.senderId);
    return dtoMessageWithSenderToGql(message, sender);
  });

  return gqlMessages;
};
