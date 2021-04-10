import { FC } from 'react';
import { IconButton, GridTemplate, GridItem, GridItemWithPic, SmallText } from '@next/ui';
import { MailIcon, CogIcon } from '@heroicons/react/outline';
import { Message, Org, SecureBase } from '../../../graphql/generated/graphql';

type UserProfileProps = {
  userName: string;
  image: string;
  icon: string;
  description: string;
  email: string;
  orgs: Org[];
  messages: Message[];
  secureBases: SecureBase[];
};

export const UserProfile: FC<UserProfileProps> = ({
  userName,
  image,
  icon,
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
            <div>
              <img
                className="h-32 w-full object-cover lg:h-56"
                src={image || '/hands_mid-reso.jpg'}
                alt="ユーザーイメージ"
              />
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div className="flex">
                    <img
                      className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-yellow-100"
                      src={icon || '/asian_man1.jpg'}
                      alt="ユーザーアイコン"
                    />
                  </div>
                  <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                      <IconButton label="メッセージ" svgIcon={<MailIcon />} />
                      <IconButton label="アカウント設定" svgIcon={<CogIcon />} />
                    </div>
                  </div>
                </div>
                <div className="sm:block mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">{userName}</h1>
                </div>
              </div>
            </div>

            <div className="mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <GridTemplate>
                <GridItem label="自己紹介" content={description} colSpan="col-span-1" />
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
              <h2 className="text-sm font-medium text-gray-500">ダイアローグベース</h2>
              <GridTemplate>
                {secureBases ? (
                  secureBases.map((base) => {
                    return (
                      <div key={base.id}>
                        <GridItemWithPic
                          name={base.baseOwner.userName}
                          description={base.id}
                          // url={`/org/${org.id}`}
                        />
                      </div>
                    );
                  })
                ) : (
                  <SmallText>所属ベースは有りません</SmallText>
                )}
              </GridTemplate>
            </div>

            <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-500">所属団体</h2>
              <GridTemplate>
                {orgs
                  ? orgs.map((org) => {
                      return (
                        <div key={org.id}>
                          <GridItemWithPic
                            name={org.orgName}
                            description={org.description}
                            url={`/org/${org.id}`}
                          />
                        </div>
                      );
                    })
                  : null}
              </GridTemplate>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};
