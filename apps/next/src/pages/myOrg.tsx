import { NextPage } from 'next';
import { SyntheticEvent } from 'react';
import { ButtonBig } from '../components/presentational/atoms/Buttons';
import { useGetOrgsQuery } from '../graphql/generated/graphql';

const MyOrg: NextPage = () => {
  const { data, loading, error, refetch } = useGetOrgsQuery();

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
              <li>{orgs.orgName}</li>
              <li>{orgs.location}</li>
            </ul>
          </div>
        ))}
      <ButtonBig type="button" onClick={handleClick}>
        再読み込み
      </ButtonBig>
    </>
  );
};
export default MyOrg;
