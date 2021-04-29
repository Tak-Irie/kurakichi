import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { useDropzone } from 'react-dropzone';

import { IconsDocumentAdd, AvatarBig } from '@next/ui';
import { UploadFiles } from '../../../util';

type AvatarChangeableProps = {
  setAvatar: Dispatch<SetStateAction<UploadFiles>>;
  files: UploadFiles;
};

export const AvatarChangeable: FC<AvatarChangeableProps> = ({ setAvatar, files }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setAvatar({
        ...files,
        avatar: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      });
    },
  });

  useEffect(() => {
    if (typeof files.avatar === 'object') {
      URL.revokeObjectURL(files.avatar[0]?.preview);
    }
  }, [files.avatar]);

  return (
    <div className="relative flex items-center justify-center h-32 w-32 ">
      <AvatarBig
        src={typeof files.avatar === 'object' ? files.avatar[0].preview : files.avatar}
        alt="プロフィールアバター"
      />
      <div
        className="bg-black rounded-full ring-4 ring-white opacity-50 transition duration-500 group hover:opacity-75 min-h-full min-w-full flex flex-col justify-center items-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <label className="z-10 h-16 w-16 group absolute flex flex-col justify-center items-center px-4 py-6 border rounded-full cursor-pointer">
          <IconsDocumentAdd overwriteCSS={'w-8 h-8 text-gray-400'} />
        </label>
      </div>
    </div>
  );
};
