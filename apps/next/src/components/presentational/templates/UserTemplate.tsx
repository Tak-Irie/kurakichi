import { ReactNode, VFC } from 'react';
import { ProfileHeader, Text2xl } from '@next/ui';

type UserTemplateProps = {
  avatar: string;
  image: string;
  userName: string;
  headerButtons?: ReactNode;
  pageContents: ReactNode;
};

export const UserTemplate: VFC<UserTemplateProps> = ({
  headerButtons,
  pageContents,
  avatar,
  image,
  userName,
}) => {
  return (
    <div className="grid grid-cols-12 pb-10">
      <div className="col-span-full">
        <ProfileHeader avatarSrc={avatar} imageSrc={image} buttons={headerButtons} />
      </div>
      <div className="col-start-3">
        <Text2xl content={userName} />
      </div>
      <div className="col-start-3 col-end-10 mt-2">{pageContents}</div>
    </div>
  );
};
