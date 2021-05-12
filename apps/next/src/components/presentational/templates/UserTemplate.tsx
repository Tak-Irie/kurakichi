import { ReactElement, VFC } from 'react';
import { ProfileHeader, ProfileHeaderSetting, Text2xl } from '@next/ui';

type UserTemplateProps = {
  avatar: string;
  image: string;
  userName: string;
  pageContents: ReactElement;
  headerButtons?: ReactElement;
  settingHeader?: boolean;
};

export const UserTemplate: VFC<UserTemplateProps> = ({
  headerButtons,
  pageContents,
  avatar,
  image,
  userName,
  settingHeader = false,
}) => {
  return (
    <div className="grid grid-cols-12 pb-10">
      <div className="col-span-full">
        {settingHeader ? (
          <ProfileHeaderSetting avatarSrc={avatar} imageSrc={image} buttons={headerButtons} />
        ) : (
          <ProfileHeader avatarSrc={avatar} imageSrc={image} buttons={headerButtons} />
        )}
      </div>
      <div className="col-start-3">
        <Text2xl content={userName} />
      </div>
      <div className="col-start-3 col-end-11 mt-2">{pageContents}</div>
    </div>
  );
};
