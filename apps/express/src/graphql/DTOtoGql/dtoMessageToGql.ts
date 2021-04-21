import { DTOMessage } from '@kurakichi/domain';
import { idMapper } from '../../util/idMapper';
import { NexusGenFieldTypes } from '../generated/nexus';

export const dtoMessageToGql = (message: DTOMessage): NexusGenFieldTypes['Message'] => {
  const { content, id, receiver, sender, status } = message;
  return {
    id,
    content,
    messageStatus: status,
    receiver: idMapper(receiver),
    sender: idMapper(sender),
  };
};

export const dtoMessagesToGql = (messages: DTOMessage[]): NexusGenFieldTypes['Message'][] => {
  return messages.map((message) => dtoMessageToGql(message));
};
