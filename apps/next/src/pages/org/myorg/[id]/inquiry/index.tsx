import { NextPage } from 'next';
import Link from 'next/link';

import { useGetInquiriesByOrgIdQuery, useGetOrgPrivateInfoByIdAndCookieQuery } from '@next/graphql';
import {
  OrgMyPage,
  LoadingSpinner,
  OrgTemplate,
  ButtonWithIcon,
  IconsCog,
  IconsUsers,
  IconsMail,
  TableInquiry,
} from '@next/ui';
import { useRouter } from 'next/router';
import { isServer } from '../../../../../util';

const InquiryBoxPrivatePage: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;
  const { data: orgData } = useGetOrgPrivateInfoByIdAndCookieQuery({
    variables: { orgId: router.query.id as string },
    fetchPolicy: 'cache-only',
    skip: isServer(),
  });

  const { data, loading, error } = useGetInquiriesByOrgIdQuery({ variables: { orgId: orgId } });

  if (loading) return <LoadingSpinner />;

  if (error) return <p>{error.message}</p>;

  const { avatar, image, orgName, id } = orgData.getOrgPrivateInfoByIdAndCookie.org;
  return (
    <OrgTemplate
      avatar={avatar}
      image={image}
      orgName={orgName}
      headerButtons={
        <Link href="/org/myorg/[id]" as={`/org/myorg/${id}`} passHref>
          <a href="replace">
            <ButtonWithIcon type="button" label="団体ページに戻る" icon={<IconsUsers />} />
          </a>
        </Link>
      }
      pageContents={
        <TableInquiry
          inquiries={data.getInquiriesByOrgId.inquiries}
          orgId={id}
          tableLabel="お問い合わせ一覧"
        />
      }
    />
  );
};

export default InquiryBoxPrivatePage;
