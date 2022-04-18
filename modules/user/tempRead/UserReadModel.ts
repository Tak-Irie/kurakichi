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
  sentMessages: Message[];
};

type Message = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  sentAt: string;
  status: string;
  messageTreeId: string;
};
