import { NextPage } from 'next';
import { LoadingStylishSpinner, ProfileHeaderSetting, Form } from '@next/ui';
import { UpdateOrgProfileForm } from '@next/container';
import { useGetOrgPrivateInfoByIdAndCookieQuery } from '@next/graphql';
import { useRouter } from 'next/router';

const OrgSetting: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;

  const { data } = useGetOrgPrivateInfoByIdAndCookieQuery({
    fetchPolicy: 'cache-only',
    variables: { orgId },
  });

  if (data?.getOrgPrivateInfoByIdAndCookie.org) {
    const { avatar, image, email, description, orgName } = data?.getOrgPrivateInfoByIdAndCookie.org;
    return (
      <div className="grid grid-cols-12">
        <div className="col-span-full">
          <ProfileHeaderSetting avatarSrc={avatar} imageSrc={image} />
        </div>
        <div className="mt-10 col-start-3 col-end-11">{/* <UpdateOrgProfileForm /> */}</div>
      </div>
    );
  }

  return <p>something wrong</p>;
};

export default OrgSetting;
