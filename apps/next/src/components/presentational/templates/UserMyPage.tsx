import { FC } from 'react';
import Link from 'next/link';

import { MailIcon, CogIcon } from '@heroicons/react/outline';

import { Message, Org, SecureBase } from '../../../graphql/generated/graphql';
import {
  ProfileHeader,
  IconButton,
  GridTemplate,
  GridItem,
  GridItemWithPic,
  SmallText,
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
  return (
    <div className="bg-white min-h-screen">
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
          tabIndex={0}
        >
          <article className="bg-gray-100">
            <ProfileHeader imageSrc={image} avatarSrc={avatar} profileName={userName}>
              <IconButton label="メッセージボックス" svgIcon={<MailIcon />} />
              <Link href="/user/mysetting">
                <a href="/user/mysetting">
                  <IconButton label="アカウント設定" svgIcon={<CogIcon />} />
                </a>
              </Link>
            </ProfileHeader>

            <div className="mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <GridTemplate>
                <GridItem
                  label="自己紹介"
                  content={description === 'UNKNOWN' ? '自己紹介記入欄です' : description}
                  colSpan="col-span-1"
                />
                <GridItem label="メールアドレス" content={email} colSpan="col-span-1" />
              </GridTemplate>
            </div>

            <div className="mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-500">新着メッセージ</h2>
              <GridTemplate>
                {messages[0] ? (
                  messages.map((message) => {
                    return (
                      <div key={message.id}>
                        <GridItem label={message.content} content={message.content} />
                      </div>
                    );
                  })
                ) : (
                  <SmallText>新着メッセージはありません</SmallText>
                )}
              </GridTemplate>
            </div>

            <div className="mt-8 max-w-5xl mx-auto px-4  sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-500">セキュアベース</h2>
              <GridTemplate>
                {secureBases[0] ? (
                  secureBases.map((base) => {
                    return (
                      <div key={base.id}>
                        <GridItemWithPic
                          name={base.baseOwner.userName}
                          description={base.id}
                          url={`/securebase/${base.id}`}
                          imgSrc=""
                          imgAlt=""
                        />
                      </div>
                    );
                  })
                ) : (
                  <SmallText>所属ベースはありません</SmallText>
                )}
              </GridTemplate>
            </div>

            <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-500">所属団体</h2>
              <GridTemplate>
                {orgs[0] ? (
                  orgs.map((org) => {
                    return (
                      <div key={org.id}>
                        <GridItemWithPic
                          name={org.orgName}
                          description={org.description}
                          url={`/org/${org.id}`}
                          imgAlt=""
                          imgSrc=""
                        />
                      </div>
                    );
                  })
                ) : (
                  <SmallText>所属団体はありません</SmallText>
                )}
              </GridTemplate>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};
