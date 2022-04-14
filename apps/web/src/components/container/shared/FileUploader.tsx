import { ChangeEvent, FC, useState } from 'react';

type FileUploaderProps = {
  some?: string;
};

export const FileUploader: FC<FileUploaderProps> = () => {
  const [image, setImage] = useState<File>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files[0];
    console.log('uploaded:', uploaded);
    setImage(uploaded);
  };

  // const handleClick = async (e: MouseEvent<HTMLInputElement>) => {
  //   const res = await uploadImage({avatar:""});
  //   console.log('fetchRes:', res);
  // };

  return (
    <form className="space-y-5 py-10 max-w-sm flex flex-col">
      <input type="file" name="avatar" onChange={handleChange} />
      {/* <input type="button" value="Send File" onClick={handleClick} /> */}
    </form>
  );
};
