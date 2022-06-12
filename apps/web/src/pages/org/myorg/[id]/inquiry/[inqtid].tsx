import idx from 'idx';
import { NextPage } from 'next';
import Link from 'next/link';

import { useRouter } from 'next/router';
import { InquiryTree } from '../../../../../components/container/org/InquiryTree';
import {
  ButtonWithIcon,
  IconsMail,
  IconsUsers,
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
    const fetchedOrg = orgData.getOrgInfoByMemberCookieAndId;
    const inquiries = idx(inqTree, (processor) => processor.leaves.edges);
    return (
      <OrgTemplate
        avatar={fetchedOrg.avatarUrl || FAIL_TO_FETCH}
        image={fetchedOrg.heroImageUrl || FAIL_TO_FETCH}
        orgName={fetchedOrg.name || FAIL_TO_FETCH}
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
        pageTabs={[]}
        pageContents={[
          {
            id: 'tree',
            content: (
              <InquiryTree
                orgId={fetchedOrg.id}
                inquiries={inquiries?.map((inq) => inq.node) || []}
              />
            ),
          },
        ]}
      />
    );
  }
  return <p>something wrong</p>;
};

export default InquiryTreePrivatePage;
