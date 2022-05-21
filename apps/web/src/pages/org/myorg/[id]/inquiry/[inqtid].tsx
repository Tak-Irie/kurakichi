import idx from 'idx';
import { NextPage } from 'next';
import Link from 'next/link';

import { useRouter } from 'next/router';
import {
  ButtonWithIcon,
  IconsMail,
  IconsUsers,
  InquiryTree,
  LoadingSpinner,
  OrgTemplate,
} from '../../../../../components/presentational';
import {
  useGetInquiriesByTreeIdQuery,
  useGetOrgPrivateInfoByCookieAndIdQuery,
} from '../../../../../graphql';
import { FAIL_TO_FETCH } from '../../../../../lib/Constants';

const InquiryTreePrivatePage: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;
  const inqtId = router.query.inqtid as string;
  const { data: orgData } = useGetOrgPrivateInfoByCookieAndIdQuery({
    fetchPolicy: 'cache-first',
    variables: { orgId },
    ssr: false,
  });
  const { data, loading, error } = useGetInquiriesByTreeIdQuery({
    variables: { treeId: inqtId },
    ssr: false,
  });

  // console.log('.org:', orgData.org);
  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getInquiriesByTreeId?.__typename === 'Errors') {
    return <p>{data.getInquiriesByTreeId.applicationError?.message}</p>;
  }

  if (
    data?.getInquiriesByTreeId?.__typename === 'InquiryTree' &&
    orgData?.getOrgInfoByMemberCookieAndId?.__typename === 'Org'
  ) {
    const inqTree = data.getInquiriesByTreeId;
    const _org = orgData.getOrgInfoByMemberCookieAndId;
    const inquiries = idx(inqTree, (idx) => idx.leaves.edges);
    return (
      <OrgTemplate
        avatar={_org.avatarUrl || FAIL_TO_FETCH}
        image={_org.heroImageUrl || FAIL_TO_FETCH}
        orgName={_org.name || FAIL_TO_FETCH}
        headerButtons={
          <>
            <Link href="/org/myorg/[id]" as={`/org/myorg/${orgId}`} passHref>
              <a href="replace">
                <ButtonWithIcon
                  type="button"
                  label="団体ページに戻る"
                  icon={<IconsUsers />}
                />
              </a>
            </Link>
            <Link
              href="/org/myorg/[id]/inquiry/"
              as={`/org/myorg/${orgId}/inquiry`}
              scroll={false}
              passHref
            >
              <a href="replace">
                <ButtonWithIcon
                  type="button"
                  label="お問い合わせボックス"
                  icon={<IconsMail />}
                />
              </a>
            </Link>
          </>
        }
        pageContents={
          <InquiryTree
            orgId={_org.id}
            inquiries={inquiries?.map((inq) => inq.node) || []}
          />
        }
      />
    );
  }
  return <p>something wrong</p>;
};

export default InquiryTreePrivatePage;
