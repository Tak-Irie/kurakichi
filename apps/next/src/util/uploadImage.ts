import { UploadFiles } from './ownTypes';

export const uploadImage = async (arg: UploadFiles): Promise<Response> => {
  const API_URL =
    process.env.NEXT_PUBLIC_HTTP + `/upload/profile` || `http://localhost:4000/upload/profile`;

  const formData = new FormData();
  formData.append('avatar', arg.avatar[0]);
  formData.append('image', arg.image[0]);

  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  return res;
};
