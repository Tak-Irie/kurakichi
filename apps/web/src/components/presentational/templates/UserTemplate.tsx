import { FC, ReactElement } from 'react';
import { Text2xl } from '../atoms';
import { ProfileHeader, ProfileHeaderSetting } from '../organisms';

type UserTemplateProps = {
  avatar: string;
  image: string;
  userName: string;
  pageContents: ReactElement;
  headerButtons?: ReactElement;
  settingHeader?: boolean;
};

export const UserTemplate: FC<UserTemplateProps> = ({
  headerButtons,
  pageContents,
  avatar,
  image,
  userName,
  settingHeader = false,
}) => (
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
    <div className="col-start-3">
      <Text2xl content={userName} />
    </div>
    <div className="col-start-3 col-end-11 mt-2">{pageContents}</div>
  </div>
);
