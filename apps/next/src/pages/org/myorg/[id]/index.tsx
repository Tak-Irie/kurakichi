import { NextPage } from 'next';
import Link from 'next/link';

import { useGetOrgPrivateInfoByIdAndCookieQuery } from '@next/graphql';
import {
  OrgMyPage,
  LoadingSpinner,
  OrgTemplate,
  ButtonWithIcon,
  IconsCog,
  IconsMail,
} from '@next/ui';
import { isServer, useGetIdFromUrl } from '../../../../util';
import { useRouter } from 'next/router';

const OrgPrivatePage: NextPage = () => {
  const router = useRouter();
  const { data, loading, error } = useGetOrgPrivateInfoByIdAndCookieQuery({
    variables: { orgId: router.query.id as string },
    skip: isServer(),
  });

  if (loading) return <LoadingSpinner />;

  if (error) return <p>{error.message}</p>;

  if (data.getOrgPrivateInfoByIdAndCookie.error)
    return <p>{data.getOrgPrivateInfoByIdAndCookie.error.message}</p>;

  const { avatar, image, orgName, id } = data.getOrgPrivateInfoByIdAndCookie.org;
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
      pageContents={<OrgMyPage org={data.getOrgPrivateInfoByIdAndCookie.org} />}
    />
  );
};

export default OrgPrivatePage;
