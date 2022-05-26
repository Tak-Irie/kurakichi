import idx from 'idx';
import { FC } from 'react';

import { Org } from '../../../graphql';
import { GoogleMap } from '../../container/shared';
import { GridItemWithPic, GridTemplate, TextLabeled } from '../atoms';

type OrgProfileProps = {
  org: Org;
};

export const OrgProfile: FC<OrgProfileProps> = ({ org }) => {
  const { email, phoneNumber, address, homePage, description, members } = org;
  const geo = { lat: address?.latitude || 0, lng: address?.longitude || 0 };
  const idxMembers = idx(members, (d) => d.edges);

  return (
    <>
      <div className="grid grid-cols-2 gap-y-4 mt-6 max-w-5xl">
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
        <span className="col-span-2 mt-1">
          <GoogleMap center={geo} zoomLevel={15} />
        </span>
      </div>

      <div className="mt-8">
        <h2 className="text-sm font-medium text-gray-500">団体メンバー</h2>
        <GridTemplate>
          {idxMembers
            ? idxMembers.map((edge) => {
                const member = edge.node;
                return (
                  <div key={member.id}>
                    <GridItemWithPic
                      name={member.name}
                      description={member.selfIntro}
                      imgSrc={member.avatarUrl}
                      imgAlt="メンバーアバター"
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
