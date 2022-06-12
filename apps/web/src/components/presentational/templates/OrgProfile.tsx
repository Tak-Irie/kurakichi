import idx from 'idx';
import { FC } from 'react';

import { Org } from '../../../graphql';
import { Map } from '../../container/shared/GoogleMap/index';
import { Marker } from '../../container/shared/GoogleMap/Marker';
import { GridItemWithPic, TextLabeled } from '../atoms';

type OrgProfileProps = {
  org: Org;
};

export const OrgProfile: FC<OrgProfileProps> = ({ org }) => {
  const { email, phoneNumber, address, homePage, description, members } = org;
  const geo = { lat: address?.latitude || 0, lng: address?.longitude || 0 };
  const idxMembers = idx(members, (d) => d.edges);

  return (
    <div className="grid grid-cols-2 gap-y-4 mt-6">
      <TextLabeled label="メールアドレス" content={email || ''} />
      <TextLabeled label="電話番号" content={phoneNumber || ''} />
      <TextLabeled label="所在地" content={address?.address || ''} />
      <TextLabeled
        label="ホームページ"
        content={homePage || 'ホームページはありません'}
      />
      <TextLabeled
        label="私達について"
        content={description || '団体の概要を記入して下さい'}
      />
      <div className="col-span-2 mt-1 w-auto h-[400px]">
        <Map>
          <Marker position={geo} />
        </Map>
      </div>
      <h2 className="col-span-2 text-sm font-medium text-gray-500">
        団体メンバー
      </h2>
      {idxMembers
        ? idxMembers.map((edge) => {
            const member = edge.node;
            return (
              <div key={member.id} className="m-2">
                <GridItemWithPic
                  name={member.name}
                  description={member.selfIntro}
                  imgSrc={member.avatarUrl}
                  imgAlt="user-avatar"
                  linkUrl="/user/[id]"
                  linkAs={`/user/${member.id}`}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};
