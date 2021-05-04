import { VFC } from 'react';
import { GridTemplate, GridItem, GridItemWithPic } from '@next/ui';
import { Org } from '@next/graphql';

type OrgProfileProps = {
  org: Org;
};

export const OrgProfile: VFC<OrgProfileProps> = ({ org }) => {
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
  } = org;

  return (
    <>
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
                      linkUrl="/user/[id]"
                      linkAs={`/user/${member.id}`}
                    />
                  </div>
                );
              })
            : null}
        </GridTemplate>
      </div>
    </>
  );
};
