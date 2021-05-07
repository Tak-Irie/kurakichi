import { NextPage } from 'next';
import { SyntheticEvent } from 'react';
import { ButtonBig } from '../components/presentational/atoms/Buttons';
import { Card, SmallCard } from '@next/ui';
import { useRequestJoinOrgMutation, useGetOrgsQuery } from '../graphql/generated/graphql';
import Link from 'next/link';

const Orgs: NextPage = () => {
  const { data, loading, error, refetch } = useGetOrgsQuery();

  const [joinOrg, { data: joinData }] = useRequestJoinOrgMutation();

  const handleCardClick = (id: string, e: SyntheticEvent) => {
    try {
      e.preventDefault();
      // console.log('fire, id is:', id);
      joinOrg({
        variables: { requestOrgId: id },
      });
    } catch (err) {
      console.log('err:', err);
    }
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
              <SmallCard title={org.orgName} content={org.location}>
                <ButtonBig
                  type="button"
                  label={
                    <Link href="/org/[id]" as={`/org/${org.id}`} passHref>
                      <a href="replace">組織詳細</a>
                    </Link>
                  }
                />
                <ButtonBig
                  type="button"
                  onClick={(e) => handleCardClick(org.id, e)}
                  label="登録申請"
                />
              </SmallCard>
            </ul>
          </div>
        ))}
      {joinData?.requestJoinOrg.org && (
        <p>{joinData.requestJoinOrg.org.orgName}への申請が完了しました。申請許可をお待ち下さい</p>
      )}
      <ButtonBig type="button" onClick={handleClick}>
        再読み込み
      </ButtonBig>
    </>
  );
};
export default Orgs;
