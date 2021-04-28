import { FC } from 'react';
import Link from 'next/link';

import { Message, Org, SecureBase } from '../../../graphql/generated/graphql';
import {
  ProfileHeader,
  TextSmall,
  IconsMail,
  IconsCog,
  Text2xl,
  TextLabeled,
  TextLabel,
  CardWithPick,
  TableNewMessages,
} from '@next/ui';
import { ButtonWithIcon } from '../atoms';

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
  console.log('messages:', messages);
  return (
    <div className="grid grid-cols-12 pb-10">
      <div className="col-span-full">
        <ProfileHeader avatarSrc={avatar} imageSrc={image} colSpan="3">
          <Link href="/user/setting">
            <a href="/user/setting">
              <ButtonWithIcon type="button" label="アカウント設定" icon={<IconsCog />} />
            </a>
          </Link>
          <ButtonWithIcon type="button" label="メッセージボックス" icon={<IconsMail />} />
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
        <TextLabel content={'新着メッセージ'} />
        {messages[0] ? (
          <TableNewMessages messages={messages} />
        ) : (
          <TextSmall content="新着メッセージはありません" />
        )}
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content={'所属ベース'} />
        {secureBases[0] ? (
          secureBases.map((base) => {
            return <p>{base.baseOwner}</p>;
          })
        ) : (
          <TextSmall content="所属ベースはありません" />
        )}
      </div>
      <div className="col-start-3 col-end-10 mt-5">
        <TextLabel content={'所属団体'} />
        {orgs[0] ? (
          orgs.map((org) => {
            return (
              <CardWithPick
                key={org.id}
                image={org.avatar === 'UNKNOWN' ? '/logo_temp.png' : org.avatar}
                title={org.orgName}
                content={org.description}
                imageAlt="団体アバター"
                linkUrl={org.id}
              />
            );
          })
        ) : (
          <TextSmall content="所属団体はありません" />
        )}
      </div>
    </div>
  );
};
