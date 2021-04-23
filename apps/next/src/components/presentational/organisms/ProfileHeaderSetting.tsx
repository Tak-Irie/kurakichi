import { FC, useEffect, useState } from 'react';

import { ImageHeroChangeable, AvatarChangeable, ButtonWithIcon, IconsCloudUpload } from '@next/ui';
import { UploadFiles, uploadImage } from '../../../util';

type ProfileHeaderProps = {
  imageSrc: string;
  avatarSrc: string;
};

export const ProfileHeaderSetting: FC<ProfileHeaderProps> = ({ avatarSrc, imageSrc }) => {
  const [files, setFiles] = useState<UploadFiles>({ image: imageSrc, avatar: avatarSrc });
  const [disable, setDisable] = useState(true);

  const handleClick = async () => {
    console.log('clicked:', files);
    const res = await uploadImage(files);
    console.log('res:', res);
  };

  useEffect(() => {
    if (typeof files.image === 'object' || typeof files.avatar === 'object') {
      setDisable(false);
    }
    // console.log('filesOnEff:', files);
  }, [files]);

  return (
    <div>
      <ImageHeroChangeable files={files} setImage={setFiles} />
      <div className="grid grid-cols-2 sm:mx-28">
        <div>
          <AvatarChangeable files={files} setAvatar={setFiles} />
        </div>
        <div className={`flex md:pr-24 justify-end items-end`}>
          <ButtonWithIcon
            disabled={disable}
            onClick={handleClick}
            type="button"
            label="画像をアップロードする"
            icon={<IconsCloudUpload />}
          />
        </div>
      </div>
    </div>
  );
};
