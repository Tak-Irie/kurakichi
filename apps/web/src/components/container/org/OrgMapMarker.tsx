import { FC } from 'react';
import { useGetOrgsForMapQuery } from '../../../graphql';
import { LoadingSpinner } from '../../presentational';
import { Marker } from '../shared/GoogleMap/Marker';

export const OrgMapMarker: FC = () => {
  const { data, loading, error } = useGetOrgsForMapQuery({ ssr: false });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>wip</p>;
  }

  if (data.getOrgs.__typename === 'Errors') {
    return <p>wip</p>;
  }

  if (data.getOrgs.__typename === 'Orgs') {
    const orgs = data.getOrgs.orgs;
    return (
      <>
        {orgs.map((org) => {
          return (
            <Marker
              key={org.id}
              label={org.name}
              position={{
                lat: org.address.latitude,
                lng: org.address.longitude,
              }}
            />
          );
        })}
      </>
    );
  }

  return <p>something wrong</p>;
};
