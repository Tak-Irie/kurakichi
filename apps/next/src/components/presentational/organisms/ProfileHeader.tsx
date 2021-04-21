import { FC } from 'react';

import { ImageHero, AvatarBig } from '@next/ui';

type ProfileHeaderProps = {
  imageSrc: string;
  avatarSrc: string;
  profileName: string;
};

export const ProfileHeader: FC<ProfileHeaderProps> = (props) => {
  const { avatarSrc, children, imageSrc, profileName } = props;
  return (
    <div>
      <ImageHero src={imageSrc} alt="イメージ画像" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 lg:grid lg:grid-cols-3 sm:flex sm:items-end sm:space-x-5">
          <AvatarBig src={avatarSrc} alt="プロフィールアバター" />
          <div className="lg:col-span-2 relative">
            <div className="flex flex-row-reverse mt-6 sm:min-w-0 sm:flex sm:space-x-6 sm:pb-1">
              {children}
            </div>
          </div>
        </div>
        <div className="sm:block mt-6 min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 truncate">{profileName}</h1>
        </div>
      </div>
    </div>
  );
};
