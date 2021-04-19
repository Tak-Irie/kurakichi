import { useRouter } from 'next/router';

export const useGetIdFromUrl = (): string => {
  const router = useRouter();
  console.log('urlQuery:', router.query);
  const urlQueryId = typeof router.query.id === 'string' ? router.query.id : 'none';

  return urlQueryId;
};
