import { FC, ReactNode, useEffect, useState } from 'react';

import { UploadFiles } from '../../../lib';
import { ButtonWithIcon, IconsCloudUpload } from '../atoms';
import { AvatarChangeable, ImageHeroChangeable } from '../molecules';

type ProfileHeaderProps = {
  imageSrc: string;
  avatarSrc: string;
  buttons?: ReactNode;
};

export const ProfileHeaderSetting: FC<ProfileHeaderProps> = ({
  avatarSrc,
  imageSrc,
  buttons,
}) => {
  const [files, setFiles] = useState<UploadFiles>({
    image: imageSrc,
    avatar: avatarSrc,
  });
  const [isDisable, setIsDisable] = useState(true);
  // const [upload, { data, loading, error }] = useUploadFileMutation();

  const handleClick = async () => {
    // console.log('clicked:', files);
    // const res = await upload(files as any);
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
      <div className="flex col-span-6 col-end-11 justify-end mt-4 space-x-1">
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
