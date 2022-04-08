import { Message } from "../domain";

export type DTOMessage = {
  id: string;
  content: string;
  status: "DRAFT" | "READ" | "UNREAD";
  senderId: string;
  receiverId: string;
  sentAt: string;
  treeId: string;
};

export const createDTOMessageFromDomain = (message: Message): DTOMessage => {
  const { id, content, receiver, sender, status, sentAt, treeId } =
    message.getProps();
  return {
    id: id.getId(),
    content: content.getText(),
    status: status.getValue(),
    receiverId: receiver.getId(),
    senderId: sender.getId(),
    sentAt: sentAt.getJpDate(),
    treeId: treeId.getId(),
  };
};
export const createDTOMessagesFromDomain = (
  messages: Message[]
): DTOMessage[] => {
  return messages.map((message) => createDTOMessageFromDomain(message));
};
