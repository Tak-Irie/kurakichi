export type UserReadModel = {
  id: string;
  email: string;
  name: string;
  password: string;
  ssoSub: string;
  avatar: string;
  image: string;
  description: string;
  role: string;
  receivedMessages: Message[];
};

type Message = {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  sentAt: string;
  status: string;
  messageTreeId: string;
};
