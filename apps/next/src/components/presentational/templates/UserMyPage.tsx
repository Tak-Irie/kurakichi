import { FC, useState } from 'react';
import Link from 'next/link';

import { Message, Org, SecureBase } from '../../../graphql/generated/graphql';
import {
  ProfileHeader,
  IconsMail,
  IconsCog,
  Text2xl,
  TextLabeled,
  TextLabel,
  TableNewMessages,
  ButtonWithIcon,
  TableOrg,
  TableSecureBase,
} from '@next/ui';

type UserProfileProps = {
  userName: string;
  image: string;
  avatar: string;
  description: string;
  email: string;
  orgs: Org[];
  messages: Message[];
  secureBases: SecureBase[];
};

export const UserMyPage: FC<UserProfileProps> = ({
  userName,
  image,
  avatar,
  description,
  orgs,
  messages,
  email,
  secureBases,
}) => {
  // console.log('messages:', messages);
  return (
    <div className="grid grid-cols-12 pb-10">
      <div className="col-span-full">
        <ProfileHeader avatarSrc={avatar} imageSrc={image} colSpan="3">
          <Link href="/user/setting">
            <a href="/user/setting">
              <ButtonWithIcon type="button" label="アカウント設定" icon={<IconsCog />} />
            </a>
          </Link>
          <Link href="/user/messages">
            <a href="/user/messages">
              <ButtonWithIcon type="button" label="メッセージボックス" icon={<IconsMail />} />
            </a>
          </Link>
        </ProfileHeader>
      </div>
      <div className="col-start-3">
        <Text2xl content={userName} />
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content="プロフィール" />
        <div className="space-y-1 mt-2">
          <TextLabeled
            label="自己紹介"
            content={description === 'UNKNOWN' ? '自己紹介文が記入されていません' : description}
          />
          <TextLabeled label="メールアドレス" content={email} />
        </div>
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TableNewMessages
          tableLabel="新着メッセージ"
          messages={messages}
          textOfNotExist="新着メッセージはありません"
        />
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TableSecureBase secureBases={secureBases} />
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TableOrg orgs={orgs} />
      </div>
    </div>
  );
};
