import { NextPage } from 'next';
import { SyntheticEvent } from 'react';
import { MiddleButton } from '../components/presentational/atoms/Button';
import { useGetUsersQuery } from '../graphql/generated/graphql';

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
        data.getUsers.users.map((user) => (
          <div className="m-3" key={user.id}>
            <ul>
              <li>{user.id}</li>
              <li>{user.userName}</li>
            </ul>
          </div>
        ))}
      <MiddleButton type="button" onClick={handleClick}>
        再読み込み
      </MiddleButton>
    </>
  );
};
export default Users;
