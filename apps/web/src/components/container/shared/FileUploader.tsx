import { ChangeEvent, FC, useState } from 'react';

type FileUploaderProps = {
  some?: string;
};

export const FileUploader: FC<FileUploaderProps> = () => {
  const [image, setImage] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploaded = e.target.files[0];
      console.log('uploaded:', uploaded);
      setImage(uploaded);
    }
  };

  const handleClick = async () => {
    if (image) {
      try {
        // await upload({
        //   variables: { file: image },
        // });
        // if (data) {
        console.log('image:');
      } catch (err) {
        console.log('err:', err);
      }
    }
  };

  return (
    <form className="flex flex-col py-10 space-y-5 max-w-sm">
      <input type="file" name="avatar" onChange={handleChange} />
      <button aria-label="uploadImage" type="submit" onClick={handleClick} />
    </form>
  );
};
