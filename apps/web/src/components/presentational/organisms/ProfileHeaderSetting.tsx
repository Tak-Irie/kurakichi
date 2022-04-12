import { VFC, ReactNode, useEffect, useState } from 'react';

import { ImageHeroChangeable, AvatarChangeable, ButtonWithIcon, IconsCloudUpload } from '..';
import { UploadFiles, uploadImage } from '../../../util';

type ProfileHeaderProps = {
  imageSrc: string;
  avatarSrc: string;
  buttons?: ReactNode;
};

export const ProfileHeaderSetting: VFC<ProfileHeaderProps> = ({ avatarSrc, imageSrc, buttons }) => {
  const [files, setFiles] = useState<UploadFiles>({ image: imageSrc, avatar: avatarSrc });
  const [isDisable, setIsDisable] = useState(true);

  const handleClick = async () => {
    // console.log('clicked:', files);
    const res = await uploadImage(files);
    // console.log('res:', res);
  };

  useEffect(() => {
    if (typeof files.image === 'object' || typeof files.avatar === 'object') {
      setIsDisable(false);
    }
    // console.log('filesOnEff:', files);
  }, [files]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full">
        <ImageHeroChangeable files={files} setImage={setFiles} />
      </div>
      <div className="col-start-3 -mt-20">
        <AvatarChangeable files={files} setAvatar={setFiles} />
      </div>
      <div className="col-span-6 col-end-11 mt-4 flex justify-end space-x-1">
        {buttons}
        <ButtonWithIcon
          disabled={isDisable}
          onClick={handleClick}
          type="button"
          label="画像をアップロードする"
          icon={<IconsCloudUpload />}
        />
      </div>
    </div>
  );
};
