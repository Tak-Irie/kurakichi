import { NextPage } from 'next';
import { SyntheticEvent } from 'react';
import { ButtonBig } from '../components/presentational/atoms/Buttons';
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
      <ButtonBig type="button" onClick={handleClick}>
        再読み込み
      </ButtonBig>
    </>
  );
};
export default Users;
