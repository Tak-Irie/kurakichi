import { NextPage } from 'next';
import { SyntheticEvent } from 'react';
import { MiddleButton } from '../components/presentational/atoms/Button';
import { Card } from '../components/presentational/atoms/Card';
import { useOrgJoinMutation, useOrgsGetQuery } from '../graphql/generated/graphql';

const Orgs: NextPage = () => {
  const { data, loading, error, refetch } = useOrgsGetQuery();

  const [joinOrg] = useOrgJoinMutation();

  const handleCardClick = () => {
    joinOrg({
      variables: { OrgId: key },
    });
  };

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    await refetch();
  };

  return (
    <>
      {loading && <p>loading!</p>}
      {error && <p>{error.message}</p>}
      {data &&
        data.getOrgs.orgs.map((org) => (
          <div className="m-3" key={org.id}>
            <ul>
              <Card
                title={org.name}
                content={org.location}
                link={
                  <MiddleButton type="button" onClick={handleCardClick}>
                    登録申請
                  </MiddleButton>
                }
              />
            </ul>
          </div>
        ))}
      <MiddleButton type="button" onClick={handleClick}>
        再読み込み
      </MiddleButton>
    </>
  );
};
export default Orgs;
