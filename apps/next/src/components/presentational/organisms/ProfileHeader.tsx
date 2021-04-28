import { FC, useState } from 'react';
import { Transition } from '@headlessui/react';

import { ImageHero, AvatarBig, PopOnIcon, IconsCaution, IconsMail, ButtonWithIcon } from '@next/ui';

import { SendMessage } from '@next/container';

type ProfileHeaderProps = {
  imageSrc: string;
  avatarSrc: string;
  colSpan?: string;
};

export const ProfileHeader: FC<ProfileHeaderProps> = ({
  avatarSrc,
  imageSrc,
  children,
  colSpan = '2',
}) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full">
        <ImageHero src={imageSrc} alt="イメージ画像" />
      </div>
      <div className="col-start-3 -mt-20">
        <AvatarBig src={avatarSrc} alt="プロフィールアバター" />
      </div>
      <div className={`col-end-11 col-span-${colSpan} mt-4`}>
        <div className="flex w-auto items-center space-x-1">{children}</div>
      </div>
    </div>
  );
};
