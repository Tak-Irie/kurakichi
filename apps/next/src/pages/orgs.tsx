import { NextPage } from 'next';
import { SyntheticEvent } from 'react';
import { MiddleButton } from '../components/presentational/atoms/Button';
import { Card, SmallCard } from '@next/ui';
import { useJoinOrgMutation, useGetOrgsQuery } from '../graphql/generated/graphql';
import Link from 'next/link';

const Orgs: NextPage = () => {
  const { data, loading, error, refetch } = useGetOrgsQuery();

  const [joinOrg, { data: joinData }] = useJoinOrgMutation();

  const handleCardClick = (id: string, e: SyntheticEvent) => {
    e.preventDefault();
    console.log('fire:');
    joinOrg({
      variables: { OrgId: id },
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
          <div className="m-3">
            <ul>
              <SmallCard title={org.orgName} content={org.location} key={org.id}>
                <MiddleButton type="button">
                  <Link href="/org/[id]" as={`/org/${org.id}`}>
                    <a>組織詳細</a>
                  </Link>
                </MiddleButton>
                <MiddleButton type="button" onClick={(e) => handleCardClick(org.id, e)}>
                  登録申請
                </MiddleButton>
              </SmallCard>
            </ul>
          </div>
        ))}
      {joinData?.joinOrg.message && <p>{joinData.joinOrg.message}</p>}
      <MiddleButton type="button" onClick={handleClick}>
        再読み込み
      </MiddleButton>
    </>
  );
};
export default Orgs;
