import { FC, ReactNode } from 'react';

import { AvatarBig, ImageHero } from '../atoms';

type ProfileHeaderProps = {
  imageSrc: string;
  avatarSrc: string;
  // colSpan?: string;
  buttons?: ReactNode;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({
  avatarSrc,
  imageSrc,
  buttons,
}) => (
  <div className="grid grid-cols-12">
    <div className="col-span-full">
      <ImageHero src={imageSrc} alt="イメージ画像" />
    </div>
    <div className="col-start-3 -mt-20">
      <AvatarBig src={avatarSrc} alt="プロフィールアバター" />
    </div>
    <div className="flex col-start-6 col-end-11 justify-end mt-4 space-x-1">
      {buttons}
    </div>
  </div>
);
