import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import { useDropzone } from 'react-dropzone';

import { UploadFiles } from '../../../util';
import { AvatarBig, IconsDocumentAdd } from '../atoms';

type AvatarChangeableProps = {
  setAvatar: Dispatch<SetStateAction<UploadFiles>>;
  files: UploadFiles;
};

export const AvatarChangeable: FC<AvatarChangeableProps> = ({
  setAvatar,
  files,
}) => {
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
    <div className="flex relative justify-center items-center w-32 h-32 ">
      <AvatarBig
        src={
          typeof files.avatar === 'object'
            ? files.avatar[0].preview
            : files.avatar
        }
        alt="プロフィールアバター"
      />
      <div
        className="group flex flex-col justify-center items-center min-w-full min-h-full bg-black rounded-full ring-4 ring-white opacity-50 hover:opacity-75 transition duration-500"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <label className="group flex absolute z-10 flex-col justify-center items-center py-6 px-4 w-16 h-16 rounded-full border cursor-pointer">
          <IconsDocumentAdd overwriteCSS={'w-8 h-8 text-gray-400'} />
        </label>
      </div>
    </div>
  );
};
