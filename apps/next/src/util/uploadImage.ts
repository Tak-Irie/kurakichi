type UploadImageArg = {
  type: 'avatar' | 'image';
  data: File;
};

export const uploadImage = async (arg: UploadImageArg): Promise<Response> => {
  const { data, type } = arg;
  const API_URL =
    process.env.NEXT_PUBLIC_HTTP + `/upload/${type}` || `http://localhost:4000/upload/${type}`;

  const formData = new FormData();
  formData.append(type, data);

  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });
  return res;
};
