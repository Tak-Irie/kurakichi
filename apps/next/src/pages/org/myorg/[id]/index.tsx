import { NextPage } from 'next';
import Link from 'next/link';

import { useGetOrgPrivateInfoByIdAndCookieQuery } from '@next/graphql';
import {
  OrgMyPage,
  LoadingStylishSpinner,
  OrgTemplate,
  ButtonWithIcon,
  IconsCog,
  IconsMail,
} from '@next/ui';
import { isServer, useGetIdFromUrl } from '../../../../util';
import { useRouter } from 'next/router';

const OrgPrivatePage: NextPage = () => {
  const router = useRouter();
  // const ids = useGetIdFromUrl();
  const { data, loading, error } = useGetOrgPrivateInfoByIdAndCookieQuery({
    variables: { orgId: router.query.id as string },
    // variables: { orgId: ids.oid },
    skip: isServer(),
  });

  if (loading) return <LoadingStylishSpinner />;

  if (error) return <p>{error.message}</p>;

  const orgData = data.getOrgPrivateInfoByIdAndCookie;

  if (orgData.error) return <p>{orgData.error.message}</p>;

  const { avatar, image, orgName, id } = orgData.org;
  return (
    <OrgTemplate
      avatar={avatar}
      image={image}
      orgName={orgName}
      headerButtons={
        <>
          <Link href="/org/myorg/[id]/setting" as={`/org/myorg/${id}/setting`} passHref>
            <a href="replace">
              <ButtonWithIcon type="button" label="団体情報設定" icon={<IconsCog />} />
            </a>
          </Link>
          <Link href="/org/myorg/[id]/inquiry" as={`/org/myorg/${id}/inquiry`} passHref>
            <a href="replace">
              <ButtonWithIcon type="button" label="お問い合わせボックス" icon={<IconsMail />} />
            </a>
          </Link>
        </>
      }
      pageContents={<OrgMyPage org={orgData.org} />}
    />
  );
};

export default OrgPrivatePage;
