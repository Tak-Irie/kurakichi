import { Organization, User } from '@prisma/client';

const shared = {
  image: 'UNKNOWN',
  description: 'プロトタイプ用の仮データです',
  avatar: 'UNKNOWN',
  homePage: 'UNKNOWN',
  adminId: '01F4BVK5ZA3NA42HXKAS0EDHC2',
};

export const users: User[] = [
  {
    id: '01F4BVK5ZA3NA42HXKAS0EDHC2',
    name: 'seedAdmin',
    avatar: 'UNKNOWN',
    description: 'プロトタイプ用の仮ユーザーです',
    email: 'example@example.com',
    image: 'UNKNOWN',
    password: 'TEST_USER',
    role: 'USER',
    ssoSub: 'IT_IS_KURAKICHI_ORIGINAL_USER',
  },
];

export const orgs: Organization[] = [
  {
    id: '01F5JQA6T3TKY3H12D43VY6066',
    name: '北海道庁',
    location: '060-8588北海道札幌市中央区北三条西6-北海道庁',
    latitude: 43.06439,
    longitude: 141.3468805,
    email: 'hokkaido@example.com',
    phoneNumber: '011-231-4111',
    ...shared,
  },
  {
    id: '01F5JNGTQJX784BBMRJR7MJX8D',
    name: '青森県庁',
    location: '030-8570青森県青森市長島1-1-1青森県庁',
    latitude: 40.8242875,
    longitude: 140.7405341,
    email: 'aomori@example.com',
    phoneNumber: '017-722-1111',
    ...shared,
  },
  {
    id: '01F5JQ4V58FFJGJSENM17XJP4K',
    name: '岩手県庁',
    location: '020-8570岩手県盛岡市内丸10-1岩手県庁',
    latitude: 39.7039458,
    longitude: 141.151918,
    email: 'iwate@example.com',
    phoneNumber: '019-651-3111',
    ...shared,
  },
];
