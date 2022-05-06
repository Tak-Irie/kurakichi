import { Dispatch, FC, SetStateAction, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { UploadFiles } from '../../../lib';
import { IconsDocumentAdd, ImageHero } from '../atoms';

type ImageHeroDroppableProps = {
  setImage: Dispatch<SetStateAction<UploadFiles>>;
  files: UploadFiles;
};

export const ImageHeroChangeable: FC<ImageHeroDroppableProps> = ({
  files,
  setImage,
}) => {
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
    <div className="group grid relative grid-cols-12">
      <div className="col-span-full">
        <div className="absolute w-full h-32 bg-black opacity-50 group-hover:opacity-75 transition duration-500 lg:h-56" />
        <ImageHero
          src={
            typeof files.image === 'object'
              ? files.image[0].preview
              : files.image
          }
          alt="イメージ画像"
        />
      </div>
      <div className="absolute col-start-5 col-end-9 w-full h-full">
        <div
          className="flex justify-center py-14 w-full h-full"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <label className="flex flex-col justify-center items-center w-full h-full rounded-3xl border cursor-pointer">
            <IconsDocumentAdd overwriteCSS={'w-16 h-16 text-gray-400'} />
          </label>
        </div>
      </div>
    </div>
  );
};
