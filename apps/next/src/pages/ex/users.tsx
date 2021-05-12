import { NextPage } from 'next';
import { SyntheticEvent } from 'react';
import { ButtonBig } from '@next/ui';
import { useGetUsersQuery } from '@next/graphql';

const Users: NextPage = () => {
  const { data, loading, error, refetch } = useGetUsersQuery();

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  return (
    <>
      {loading && <p>loading!</p>}
      {error && <p>{error.message}</p>}
      {data &&
        data?.getUsers.users.map((user) => (
          <div className="m-3" key={user.id}>
            <ul>
              <li>{user.id}</li>
              <li>{user.userName}</li>
            </ul>
          </div>
        ))}
      <ButtonBig type="button" label="再読み込み" onClick={handleClick} />
    </>
  );
};
export default Users;
