import { VFC } from 'react';

import { MapViewer } from '../../container';
import { GridTemplate, TextLabeled, GridItemWithPic } from '..';
import { Org } from '../../../graphql';

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
    latitude,
    longitude,
    homePage,
    description,
    members,
    inquiries,
  } = org;
  const geo = { lat: latitude, lng: longitude };

  return (
    <>
      <div className="grid grid-cols-2 mt-6 gap-y-4 max-w-5xl">
        <TextLabeled label="メールアドレス" content={email} />
        <TextLabeled label="電話番号" content={phoneNumber} />
        <TextLabeled label="所在地" content={location} />
        <TextLabeled
          label="ホームページ"
          content={homePage === 'UNKNOWN' ? 'ホームページはありません' : homePage}
        />
        <TextLabeled
          label="私達について"
          content={description === 'UNKNOWN' ? '団体の概要を記入して下さい' : description}
        />
        <span className="col-span-2 mt-1">
          <MapViewer center={geo} mapContainerCSS={{ width: 'auto', height: 300 }} zoomLevel={15} />
        </span>
      </div>

      <div className="mt-8">
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
