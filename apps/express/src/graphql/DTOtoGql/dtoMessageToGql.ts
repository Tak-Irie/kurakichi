import { DTOMessage, DTOUser } from '@kurakichi/domain';
import { idMapper } from '../../util/idMapper';
import { NexusGenFieldTypes } from '../generated/nexus';

export const dtoMessageToGql = (message: DTOMessage): NexusGenFieldTypes['Message'] => {
  const { content, id, receiver, sender, status, sentAt } = message;
  return {
    id,
    content,
    messageStatus: status,
    receiver: idMapper(receiver),
    sender: idMapper(sender),
    sentAt,
  };
};

export const dtoMessagesToGql = (messages: DTOMessage[]): NexusGenFieldTypes['Message'][] => {
  return messages.map((message) => dtoMessageToGql(message));
};

export const dtoMessageWithSenderToGql = (
  message: DTOMessage,
  sender: DTOUser,
): NexusGenFieldTypes['Message'] => {
  const { content, id, receiver, sender: senderId, status, sentAt } = message;
  return {
    id,
    content,
    messageStatus: status,
    receiver: idMapper(receiver),
    sentAt,
    sender: { ...sender, belongOrgs: [], belongSecureBases: [], messages: [] },
  };
};

// TODO:I need implement CQRS!
export const dtoMessagesWithSenderToGql = (
  messages: DTOMessage[],
  senders: DTOUser[],
): NexusGenFieldTypes['Message'][] => {
  return messages.map((message) => {
    const sender = senders.find((sender) => sender.id === message.sender);
    return dtoMessageWithSenderToGql(message, sender);
  });
};
