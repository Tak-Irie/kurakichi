import { NextPage } from 'next';
import { SyntheticEvent } from 'react';
import { MiddleButton } from '../components/presentational/atoms/Button';
import { useOrgsGetQuery } from '../graphql/generated/graphql';

const MyOrg: NextPage = () => {
  const { data, loading, error, refetch } = useOrgsGetQuery();

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  return (
    <>
      {loading && <p>loading!</p>}
      {error && <p>{error.message}</p>}
      {data &&
        data.getOrgs.orgs.map((orgs) => (
          <div className="m-3" key={orgs.id}>
            <ul>
              <li>{orgs.id}</li>
              <li>{orgs.name}</li>
              <li>{orgs.location}</li>
            </ul>
          </div>
        ))}
      <MiddleButton type="button" onClick={handleClick}>
        再読み込み
      </MiddleButton>
    </>
  );
};
export default MyOrg;
