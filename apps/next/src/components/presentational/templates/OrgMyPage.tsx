import { FC, useState } from 'react';
import { Transition } from '@headlessui/react';

import {
  ButtonWithIcon,
  GridTemplate,
  GridItem,
  GridItemWithPic,
  ProfileHeader,
  IconsMail,
} from '@next/ui';

import { Org, useGetUserByCookieQuery } from '../../../graphql/generated/graphql';

type OrgMyPageProps = {
  org: Org;
};

export const OrgMyPage: FC<OrgMyPageProps> = (props) => {
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
  } = props.org;
  const orgId = id;
  // console.log('OrgProfileProps:', props);

  const { data } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });
  return (
    <div className="bg-white">
      <div className="flex-1 relative z-0 flex overflow-hidden">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
          tabIndex={0}
        >
          <article className="bg-gray-100 relative">
            <ProfileHeader avatarSrc={avatar} imageSrc={image} profileName={orgName}>
              <ButtonWithIcon type="button" label="メッセージボックス" icon={<IconsMail />} />
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
                            description={member.id}
                            imgAlt=""
                            imgSrc=""
                            url=""
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
