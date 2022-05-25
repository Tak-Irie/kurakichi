import { NextPage } from 'next';
import { useGetOrgsForMapQuery } from '../graphql';

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
      <li>
        {a?.map((org) => (
          <ol key={org.id}>
            <p>{org.id}</p>
            <p>{org.name}</p>
          </ol>
        ))}
      </li>
    );
  }

  return (
    <div className="inset-0">
      <p>something wrong</p>
    </div>
  );
};

export default AboutUsPage;
