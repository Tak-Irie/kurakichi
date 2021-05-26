import { NextPage } from 'next';
import Link from 'next/link';

import {
  OrgTemplate,
  InquiryTree,
  LoadingSpinner,
  ButtonWithIcon,
  IconsUsers,
  IconsMail,
} from '../../../../../components/presentational';
import {
  useGetOrgPrivateInfoByIdAndCookieQuery,
  useGetInquiriesByTreeIdAndCookieQuery,
  useAcceptJoinOrgMutation,
  useUpdateInquiryStatusMutation,
} from '../../../../../graphql';
import { isServer } from '../../../../../util';
import { useRouter } from 'next/router';

const InquiryTreePrivatePage: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;
  const inqtId = router.query.inqtid as string;
  const { data: orgData } = useGetOrgPrivateInfoByIdAndCookieQuery({
    fetchPolicy: 'cache-first',
    variables: { orgId },
    // skip: isServer(),
    // ssr: false,
  });
  const { data, loading, error } = useGetInquiriesByTreeIdAndCookieQuery({
    variables: { treeId: inqtId },
    // skip: isServer(),
    // ssr: false,
  });

  // console.log('.org:', orgData.org);
  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getInquiriesByTreeIdAndCookie.error) {
    return <p>{data.getInquiriesByTreeIdAndCookie.error.message}</p>;
  }

  if (
    data?.getInquiriesByTreeIdAndCookie.inquiryTree &&
    orgData?.getOrgPrivateInfoByIdAndCookie.org
  ) {
    const inqData = data.getInquiriesByTreeIdAndCookie.inquiryTree;
    const orgCachedData = orgData.getOrgPrivateInfoByIdAndCookie.org;
    return (
      <OrgTemplate
        avatar={orgCachedData.avatar}
        image={orgCachedData.image}
        orgName={orgCachedData.orgName}
        headerButtons={
          <>
            <Link href="/org/myorg/[id]" as={`/org/myorg/${orgId}`} passHref>
              <a href="replace">
                <ButtonWithIcon type="button" label="団体ページに戻る" icon={<IconsUsers />} />
              </a>
            </Link>
            <Link
              href="/org/myorg/[id]/inquiry/"
              as={`/org/myorg/${orgId}/inquiry`}
              scroll={false}
              passHref
            >
              <a href="replace">
                <ButtonWithIcon type="button" label="お問い合わせボックス" icon={<IconsMail />} />
              </a>
            </Link>
          </>
        }
        pageContents={<InquiryTree orgId={orgCachedData.id} inquiries={inqData.treedInquiry} />}
      />
    );
  }
  return <p>something wrong</p>;
};

export default InquiryTreePrivatePage;
