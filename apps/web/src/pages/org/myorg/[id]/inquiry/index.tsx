import idx from 'idx';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FAIL_TO_FETCH } from 'util/Constants';

import { InquiryInfiniteTable } from '../../../../../components/container';
import {
  ButtonWithIcon,
  IconsUsers,
  LoadingSpinner,
  OrgTemplate,
  TextLabel,
  TextSmall,
} from '../../../../../components/presentational';
import {
  useGetInquiriesByOrgIdQuery,
  useGetOrgPrivateInfoByCookieAndIdQuery,
} from '../../../../../graphql';

const InquiryBoxPrivatePage: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;
  const { data, loading, error } = useGetOrgPrivateInfoByCookieAndIdQuery({
    variables: { orgId },
    fetchPolicy: 'cache-first',
    ssr: false,
  });

  const {
    data: inqData,
    loading: inqLoading,
    error: inqError,
  } = useGetInquiriesByOrgIdQuery({
    variables: { orgId },
    ssr: false,
  });

  if (loading || inqLoading) return <LoadingSpinner />;
  if (error || inqError) return <p>{error?.message || inqError?.message}</p>;

  if (data?.getOrgInfoByMemberCookieAndId?.__typename === 'Errors') {
    return (
      <p>{data.getOrgInfoByMemberCookieAndId.applicationError?.message}</p>
    );
  }

  if (
    data?.getOrgInfoByMemberCookieAndId?.__typename === 'Org' &&
    inqData?.getInquiriesByOrgId?.__typename === 'InquiryConnection'
  ) {
    const _org = data.getOrgInfoByMemberCookieAndId;
    const _inq = inqData?.getInquiriesByOrgId;
    const edges = idx(_inq, (idx) => idx.edges);

    return (
      <OrgTemplate
        avatar={_org.avatarUrl || FAIL_TO_FETCH}
        image={_org.heroImageUrl || FAIL_TO_FETCH}
        orgName={_org.name || FAIL_TO_FETCH}
        headerButtons={
          <Link href="/org/myorg/[id]" as={`/org/myorg/${_org.id}`} passHref>
            <a href="replace">
              <ButtonWithIcon
                type="button"
                label="団体ページに戻る"
                icon={<IconsUsers />}
              />
            </a>
          </Link>
        }
        pageContents={
          edges && edges[0] ? (
            <>
              <TextLabel content="お問い合わせ一覧" />
              <InquiryInfiniteTable
                orgId={_org.id}
                initialInquiries={edges.map((e) => e.node)}
                limit={20}
              />
            </>
          ) : (
            <>
              <TextLabel content="お問い合わせ一覧" />
              <TextSmall content="お問い合わせは有りません" />
            </>
          )
        }
      />
    );
  }

  return <p>something wrong</p>;
};

export default InquiryBoxPrivatePage;
