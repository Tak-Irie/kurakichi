import { FC, useState } from 'react';
import {
  IconButton,
  GridTemplate,
  GridItem,
  GridItemWithPic,
  FeedbackCaution,
  IconsCaution,
  PopOnIcon,
} from '@next/ui';
import { Transition } from '@headlessui/react';
import { MailIcon } from '@heroicons/react/outline';
import { Org, useMeQuery } from '../../../graphql/generated/graphql';
import { SendInquiry } from '@next/container';
import { AvatarOrg } from '../atoms';

const OrgProfile: FC<Org> = (props) => {
  const {
    id,
    orgName,
    image,
    icon,
    email,
    phoneNumber,
    location,
    homePage,
    description,
    members,
  } = props;
  const orgId = id;

  const [isOpen, setIsOpen] = useState(false);
  const { data } = useMeQuery({ fetchPolicy: 'cache-only' });

  return (
    <div className="bg-white">
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
          tabIndex={0}
        >
          <article className="bg-gray-100 relative">
            <div>
              <img
                className="h-32 w-full object-cover lg:h-56"
                src={image === 'UNKNOWN' ? '/hands_mid-reso.jpg' : image}
                alt="団体イメージ"
              />
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 lg:grid lg:grid-cols-3 sm:flex sm:items-end sm:space-x-5">
                  <AvatarOrg />
                  <div className="lg:col-span-2 relative">
                    <div className="flex flex-row-reverse mt-6 sm:min-w-0 sm:flex sm:space-x-6 sm:pb-1">
                      {data?.me.user ? (
                        <>
                          <div className="">
                            <IconButton
                              onClick={() => setIsOpen(!isOpen)}
                              label="お問い合わせ"
                              svgIcon={<MailIcon />}
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
                          <PopOnIcon icon={<IconsCaution />}>
                            <FeedbackCaution>ログインが必要です</FeedbackCaution>
                          </PopOnIcon>
                          <IconButton
                            onClick={() => setIsOpen(!isOpen)}
                            label="メッセージを送る"
                            disabled
                            svgIcon={<MailIcon />}
                          ></IconButton>
                        </div>
                      )}

                      {/* <IconButton label="電話をかける" svgIcon={<PhoneIcon />} /> */}
                    </div>
                  </div>
                </div>
                <div className="sm:block mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">{orgName}</h1>
                </div>
              </div>
            </div>

            <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <GridTemplate>
                <GridItem label="メールアドレス" content={email} />
                <GridItem label="電話番号" content={phoneNumber} />
                <GridItem label="所在地" content={location} />
                <GridItem label="ホームページ" content={homePage} />
                <GridItem label="私達について" content={description} colSpan="col-span-2" />
              </GridTemplate>
            </div>

            <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
              <h2 className="text-sm font-medium text-gray-500">団体メンバー</h2>
              <GridTemplate>
                {members
                  ? members.map((member) => {
                      return (
                        <div key={member.id}>
                          <GridItemWithPic name={member.userName} />
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

export { OrgProfile };
