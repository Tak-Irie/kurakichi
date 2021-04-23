import { FC, useState } from 'react';

import {
  PopOnIcon,
  FeedbackCaution,
  IconsCaution,
  GridTemplate,
  GridItem,
  GridItemWithPic,
  SmallText,
  ImageHero,
  IconsMail,
  ButtonWithIcon,
} from '@next/ui';
import { SendMessage } from '@next/container';

import { Org, useGetUserByCookieQuery } from '../../../graphql/generated/graphql';
import { Transition } from '@headlessui/react';

type UserProfileProps = {
  userId: string;
  userName: string;
  image: string;
  avatar: string;
  description: string;
  orgs: Org[];
};

export const UserProfile: FC<UserProfileProps> = (props) => {
  const { avatar, description, image, orgs, userId, userName } = props;

  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });

  return (
    <div className="bg-white min-h-screen">
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
          tabIndex={0}
        >
          <article className="bg-gray-100">
            <div>
              <ImageHero src={image} alt="ユーザーイメージ" />
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                  <div className="flex">
                    <img
                      className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-yellow-100"
                      src={avatar === 'UNKNOWN' ? '/asian_man1.jpg' : avatar}
                      alt="ユーザーアバター"
                    />
                  </div>
                  <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                      {data?.getUserByCookie.user ? (
                        <>
                          <div className="">
                            <ButtonWithIcon
                              type="button"
                              onClick={() => setIsOpen(!isOpen)}
                              label="お問い合わせ"
                              icon={<IconsMail />}
                            />
                          </div>
                          <div className="mt-12 absolute w-full">
                            <Transition
                              show={isOpen}
                              enter="transition-opacity duration-150"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition-opacity duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <SendMessage receiverId={userId} />
                            </Transition>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center space-x-3">
                          <PopOnIcon icon={<IconsCaution />}>
                            <FeedbackCaution>ログインが必要です</FeedbackCaution>
                          </PopOnIcon>
                          <ButtonWithIcon
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            label="メッセージを送る"
                            disabled
                            icon={<IconsMail />}
                          ></ButtonWithIcon>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="sm:block mt-6 min-w-0 flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">{userName}</h1>
                  </div>
                </div>
              </div>

              <div className="mt-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <GridTemplate>
                  <GridItem
                    label="自己紹介"
                    content={description === 'UNKNOWN' ? '自己紹介記入欄です' : description}
                    colSpan="col-span-1"
                  />
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
                            imgSrc={org.image}
                            imgAlt="団体イメージ"
                          />
                        </div>
                      );
                    })
                  ) : (
                    <SmallText>所属団体はありません</SmallText>
                  )}
                </GridTemplate>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};
