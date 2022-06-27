export type UserReadModel = {
  id: string;
  email: string;
  name: string;
  password: string;
  ssoSub: string;
  avatarUrl: string;
  heroImageUrl: string;
  selfIntro: string;
  role: string;
  receivedMessages?: Message[];
  sentMessages?: Message[];
  belongOrgs?: Org[];
  sentInquiries?: Inquiry[];
};

type Message = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  sentAt: string;
  status: 'SENT' | 'READ' | 'UNREAD' | 'DRAFT';
  messageTreeId: string;
};

type Org = {
  id: string;
  name: string;
};

type Inquiry = {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  receivedOrgId: string;
  inquiryTreeId: string;
  sentAt: string;
  category: string;
  status: string;
};
