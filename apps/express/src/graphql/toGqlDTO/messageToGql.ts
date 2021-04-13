import { Message } from '@kurakichi/domain';
import { NexusGenFieldTypes } from '../generated/nexus';

export const messageToGql = (message: Message): NexusGenFieldTypes['Message'] => {
  const data = {
    id: message.getId(),
    content: message.getContent(),
  };

  return data;
};
