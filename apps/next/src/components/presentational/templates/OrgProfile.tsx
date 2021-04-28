import { FC, useState } from 'react';
import {
  ButtonWithIcon,
  GridTemplate,
  GridItem,
  GridItemWithPic,
  FeedbackCaution,
  IconsCaution,
  PopOnIcon,
  ProfileHeader,
} from '@next/ui';
import { Transition } from '@headlessui/react';
import { MailIcon } from '@heroicons/react/outline';
import { Org, useGetUserByCookieQuery } from '../../../graphql/generated/graphql';
import { SendInquiry } from '@next/container';

export const OrgProfile: FC<Org> = (props) => {
  const {
    id,
    orgName,
    image,
    avatar,
    email,
    phoneNumber,
    location,
    homePage,
    description,
    members,
    inquiries,
  } = props;
  const orgId = id;
  // console.log('OrgProfileProps:', props);

  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });
  return (
    <div className="bg-white">
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
          tabIndex={0}
        >
          <article className="bg-gray-100 relative">
            <ProfileHeader imageSrc={image} avatarSrc={avatar}>
              {data?.getUserByCookie.user ? (
                <>
                  <div className="">
                    <ButtonWithIcon
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      label="お問い合わせ"
                      icon={<MailIcon />}
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
                      <SendInquiry orgId={id} />
                    </Transition>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <PopOnIcon
                    icon={<IconsCaution />}
                    content={<FeedbackCaution>ログインが必要です</FeedbackCaution>}
                  />
                  <ButtonWithIcon
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                    label="メッセージを送る"
                    disabled
                    icon={<MailIcon />}
                  ></ButtonWithIcon>
                </div>
              )}
            </ProfileHeader>

            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <GridTemplate>
                <GridItem label="メールアドレス" content={email} />
                <GridItem label="電話番号" content={phoneNumber} />
                <GridItem label="所在地" content={location} />
                <GridItem
                  label="ホームページ"
                  content={homePage === 'UNKNOWN' ? 'ホームページはありません' : homePage}
                />
                <GridItem
                  label="私達について"
                  content={description === 'UNKNOWN' ? '団体の概要を記入して下さい' : description}
                  colSpan="col-span-2"
                />
              </GridTemplate>
            </div>

            <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-500">団体メンバー</h2>
              <GridTemplate>
                {members
                  ? members.map((member) => {
                      return (
                        <div key={member.id}>
                          <GridItemWithPic
                            name={member.userName}
                            description={member.description}
                            imgSrc={member.avatar}
                            imgAlt={'メンバーアバター'}
                            url={`/user/${member.id}`}
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
