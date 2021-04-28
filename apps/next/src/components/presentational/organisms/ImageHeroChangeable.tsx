import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { ImageHero, IconsDocumentAdd } from '@next/ui';
import { UploadFiles } from '../../../util';

type ImageHeroDroppableProps = {
  setImage: Dispatch<SetStateAction<UploadFiles>>;
  files: UploadFiles;
};

export const ImageHeroChangeable: FC<ImageHeroDroppableProps> = ({ files, setImage }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImage({
        ...files,
        image: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      });
    },
  });

  useEffect(() => {
    if (typeof files.image === 'object') {
      URL.revokeObjectURL(files.image[0]?.preview);
    }
  }, [files.image]);

  return (
    <div className="grid grid-cols-12 group relative">
      <div className="col-span-full">
        <div className="absolute bg-black h-32 w-full lg:h-56 opacity-50 transition duration-500 group-hover:opacity-75" />
        <ImageHero
          src={typeof files.image === 'object' ? files.image[0].preview : files.image}
          alt="イメージ画像"
        />
      </div>
      <div className="col-start-5 col-end-9 absolute w-full h-full">
        <div className="w-full h-full flex py-14 justify-center" {...getRootProps()}>
          <input {...getInputProps()} />
          <label className="w-full h-full flex flex-col justify-center items-center border rounded-3xl cursor-pointer">
            <IconsDocumentAdd overwriteCSS={'w-16 h-16 text-gray-400'} />
          </label>
        </div>
      </div>
    </div>
  );
};
