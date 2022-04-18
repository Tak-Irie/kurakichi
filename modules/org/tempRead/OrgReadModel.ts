export type OrgReadModel = {
  id: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  homePageUrl: string;
  avatarUrl: string;
  heroImageUrl: string;
  address: string;
  latitude: number;
  longitude: number;
  members: Member[];
};

export type OrgPrivateModel = {
  id: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  homePageUrl: string;
  avatarUrl: string;
  heroImageUrl: string;
  address: string;
  latitude: number;
  longitude: number;
  inquiries: InquiryModel[];
  members: Member[];
};

export type InquiryModel = {
  id: string;
  content: string;
  category: string;
  inquiryStatus: string;
  sentAt: string;
  receivedOrg: {
    id: string;
  };
  sender: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  replier: {
    id: string;
    name: string;
    avatarUrl: string;
  };
};

type Address = {
  address: string;
  latitude: string;
  longitude: string;
};

type Member = {
  id: string;
  name: string;
  selfIntro: string;
  avatarUrl: string;
  heroImageUrl: string;
};
