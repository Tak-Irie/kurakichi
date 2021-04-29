import { useRouter } from 'next/router';

export const useGetIdFromUrl = (): string => {
  const router = useRouter();
  const urlQueryId = typeof router.query.id === 'string' ? router.query.id : 'none';

  return urlQueryId;
};
