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
    <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
      <div className="relative -mt-12 sm:-mt-16 sm:flex sm:items-end">
        <div className="absolute flex items-center justify-center bg-black h-32 w-32 rounded-full ring-4 ring-white opacity-50 transition duration-500 group hover:opacity-75">
          <div
            className="absolute min-h-full min-w-full flex flex-col justify-center items-center"
            {...getRootProps()}
          >
            <input {...getInputProps()} alt="userAvatar" />
            <label className="z-10 h-16 w-16 group absolute flex flex-col justify-center items-center px-4 py-6 text-blue shadow-lg tracking-wide uppercase border border-blue rounded-full cursor-pointer">
              <IconsDocumentAdd overwriteCSS={'w-8 h-8 text-gray-400'} />
            </label>
          </div>
        </div>
        <AvatarBig
          src={typeof files.avatar === 'object' ? files.avatar[0].preview : files.avatar}
          alt="プロフィールアバター"
        />
      </div>
    </div>
  );
};
