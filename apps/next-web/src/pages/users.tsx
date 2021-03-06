import { NextPage } from 'next';
import { MiddleButton } from '../components/presentational/atoms/Button';
import { useUserGetQuery } from '../graphql/generated/graphql';

const Users: NextPage = () => {
  const { data, loading, error, refetch } = useUserGetQuery();

  return (
    <>
      {loading && <p>loading!</p>}
      {error && <p>{error.message}</p>}
      {data &&
        data.getUsers.users.map((user) => (
          <div className="m-3" key={user.id}>
            <ul>
              <li>{user.id}</li>
              <li>{user.email}</li>
              <li>{user.username}</li>
            </ul>
          </div>
        ))}
      <MiddleButton type="button" onClick={() => refetch()}>
        再読み込み
      </MiddleButton>
    </>
  );
};
export default Users;
