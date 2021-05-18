import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetInquiriesByOrgIdQuery, useGetOrgPrivateInfoByIdAndCookieQuery } from '@next/graphql';
import { LoadingSpinner, OrgTemplate, ButtonWithIcon, IconsUsers, TableInquiry } from '@next/ui';
import { isServer } from '../../../../../util';

const InquiryBoxPrivatePage: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;
  const { data, loading, error } = useGetOrgPrivateInfoByIdAndCookieQuery({
    variables: { orgId },
    fetchPolicy: 'cache-first',
    skip: isServer(),
  });

  // const { data, loading, error } = useGetInquiriesByOrgIdQuery({ variables: { orgId: orgId } });

  if (loading) return <LoadingSpinner />;

  if (error) return <p>{error.message}</p>;

  if (data?.getOrgPrivateInfoByIdAndCookie.org) {
    const { avatar, image, orgName, id } = data?.getOrgPrivateInfoByIdAndCookie.org;
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
            inquiries={data.getOrgPrivateInfoByIdAndCookie.org.inquiries}
            orgId={id}
            tableLabel="お問い合わせ一覧"
          />
        }
      />
    );
  }

  return <p>{data?.getOrgPrivateInfoByIdAndCookie.error}</p>;
};

export default InquiryBoxPrivatePage;
