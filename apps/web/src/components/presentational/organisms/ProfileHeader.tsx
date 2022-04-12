import { VFC, ReactNode } from 'react';

import { ImageHero, AvatarBig } from '..';

type ProfileHeaderProps = {
  imageSrc: string;
  avatarSrc: string;
  colSpan?: string;
  buttons?: ReactNode;
};

export const ProfileHeader: VFC<ProfileHeaderProps> = ({ avatarSrc, imageSrc, buttons }) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full">
        <ImageHero src={imageSrc} alt="イメージ画像" />
      </div>
      <div className="col-start-3 -mt-20">
        <AvatarBig src={avatarSrc} alt="プロフィールアバター" />
      </div>
      <div className="col-start-6 col-end-11 mt-4 flex justify-end space-x-1">{buttons}</div>
    </div>
  );
};
