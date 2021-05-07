import { ReactNode, VFC } from 'react';
import { ProfileHeader, Text2xl } from '@next/ui';

type OrgTemplateProps = {
  avatar: string;
  image: string;
  orgName: string;
  headerButtons?: ReactNode;
  pageContents: ReactNode;
};

export const OrgTemplate: VFC<OrgTemplateProps> = ({
  headerButtons,
  pageContents,
  avatar,
  image,
  orgName,
}) => {
  return (
    <div className="grid grid-cols-12 pb-10">
      <div className="col-span-full">
        <ProfileHeader avatarSrc={avatar} imageSrc={image} buttons={headerButtons} />
      </div>
      <div className="col-start-3">
        <Text2xl content={orgName} />
      </div>
      <div className="col-start-3 col-end-10 mt-2">{pageContents}</div>
    </div>
  );
};
