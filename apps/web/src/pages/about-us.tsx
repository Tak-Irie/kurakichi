import { useGetOrgsForMapQuery } from '@src/graphql';
import { NextPage } from 'next';

const AboutUsPage: NextPage = () => {
  const { error, loading, data } = useGetOrgsForMapQuery();

  if (loading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (data?.getOrgs?.__typename === 'Errors') {
    return <p>{data.getOrgs.applicationError?.message}</p>;
  }

  if (data?.getOrgs?.__typename === 'Orgs') {
    const a = data.getOrgs.orgs;
    return (
      <>
        <li>
          {a?.map((org) => {
            return (
              <ol>
                <p>{org.id}</p>
                <p>{org.name}</p>
              </ol>
            );
          })}
        </li>
      </>
    );
  }

  return (
    <div className="inset-0">
      <p>something wrong</p>
    </div>
  );
};

export default AboutUsPage;
