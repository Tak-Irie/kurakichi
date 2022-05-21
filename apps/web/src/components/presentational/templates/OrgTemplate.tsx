import { ReactNode, VFC } from 'react';
import { ProfileHeader, ProfileHeaderSetting, Text2xl } from '..';

type OrgTemplateProps = {
  avatar: string;
  image: string;
  orgName: string;
  pageTabs?: ReactNode;
  pageContents: ReactNode;
  headerButtons?: ReactNode;
  settingHeader?: boolean;
};

export const OrgTemplate: VFC<OrgTemplateProps> = ({
  headerButtons,
  pageTabs,
  pageContents,
  avatar,
  image,
  settingHeader = false,
  orgName,
}) => {
  return (
    <div className="grid grid-cols-12 pb-10">
      <div className="col-span-full">
        {settingHeader ? (
          <ProfileHeaderSetting
            avatarSrc={avatar}
            imageSrc={image}
            buttons={headerButtons}
          />
        ) : (
          <ProfileHeader
            avatarSrc={avatar}
            imageSrc={image}
            buttons={headerButtons}
          />
        )}
      </div>
      <div className="col-start-3 mt-5 font-bold underline">
        <Text2xl content={orgName} />
      </div>
      <div className="col-start-3 col-end-11 mt-2">{pageTabs}</div>
      <div className="col-start-3 col-end-11 mt-2">{pageContents}</div>
    </div>
  );
};
