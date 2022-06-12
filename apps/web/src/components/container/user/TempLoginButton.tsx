import {
  GetUserMyInfoDocument,
  GetUserMyInfoQuery,
  useTempLoginMutation,
} from '../../../graphql';

export const TempLoginButton = () => {
  // const router = useRouter();
  const [tempLogin] = useTempLoginMutation();

  const handleClick = async () => {
    await tempLogin({
      update: (cache, result) => {
        const tempUser = result.data;
        if (tempUser?.tempLogin.__typename === 'User') {
          cache.writeQuery<GetUserMyInfoQuery>({
            query: GetUserMyInfoDocument,
            data: {
              __typename: 'Query',
              getUserByCookie: {
                __typename: 'User',
                ...tempUser.tempLogin,
              },
            },
          });
        }
      },
    });
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-1 mr-2 ml-auto hover:bg-red-300 rounded transition duration-200"
    >
      簡易ログイン
    </button>
  );
};
