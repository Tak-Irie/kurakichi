import { FC } from 'react';
import { useGetOrgsForMapQuery } from '../../../graphql';
import { LoadingSpinner } from '../../presentational/atoms';
import { Marker } from '../shared/GoogleMap/Marker';

export const OrgMapMarker: FC = () => {
  const { data, loading, error } = useGetOrgsForMapQuery();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>wip</p>;
  }

  if (data?.getOrgs?.__typename === 'Errors') {
    return <p>wip</p>;
  }

  if (data?.getOrgs?.__typename === 'Orgs' && data.getOrgs.orgs) {
    const { orgs } = data.getOrgs;
    return (
      <>
        {orgs.map((org) => (
          <Marker
            key={org.id}
            label={org.name}
            position={{
              lat: org.address?.latitude || 0,
              lng: org.address?.longitude || 0,
            }}
          />
        ))}
      </>
    );
  }

  return <p>something wrong</p>;
};
