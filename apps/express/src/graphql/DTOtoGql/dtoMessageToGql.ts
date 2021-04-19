import { DTOMessage } from '@kurakichi/domain';
import { idMapper } from '../../util/idMapper';
import { NexusGenFieldTypes } from '../generated/nexus';

export const messageToGql = (message: DTOMessage): NexusGenFieldTypes['Message'] => {
  const { content, id, receiver, sender, status } = message;
  return {
    id,
    content,
    messageStatus: status,
    receiver: idMapper(receiver),
    sender: idMapper(sender),
  };
};

export const messagesToGql = (messages: DTOMessage[]): NexusGenFieldTypes['Message'][] => {
  return messages.map((message) => messageToGql(message));
};
