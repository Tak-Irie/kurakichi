import { Message } from '../domain';

export type DTOMessage = {
  id: string;
  content: string;
  status: 'DRAFT' | 'READ' | 'UNREAD';
  sender: string;
  receiver: string;
};

export const createDTOMessageFromDomain = (message: Message): DTOMessage => {
  const { id, content, receiver, sender, status } = message.getProps();
  return {
    id: id.getId(),
    content: content.getText(),
    status: status.getValue(),
    receiver: receiver.getId(),
    sender: sender.getId(),
  };
};
export const createDTOMessagesFromDomain = (messages: Message[]): DTOMessage[] => {
  return messages.map((message) => createDTOMessageFromDomain(message));
};
