import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  useGetInquiriesByOrgIdQuery,
  useGetOrgPrivateInfoByIdAndCookieQuery,
} from '../../../../../graphql';
import {
  LoadingSpinner,
  OrgTemplate,
  ButtonWithIcon,
  IconsUsers,
  TableInquiry,
  TextSmall,
  TextLabel,
} from '../../../../../components/presentational';
import { isServer } from '../../../../../util';
import { InquiryInfiniteTable } from '../../../../../components/container';

const InquiryBoxPrivatePage: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;
  const { data, loading, error } = useGetOrgPrivateInfoByIdAndCookieQuery({
    variables: { orgId },
    fetchPolicy: 'cache-first',
    skip: isServer(),
  });

  const {
    data: inqData,
    loading: inqLoading,
    error: inqError,
  } = useGetInquiriesByOrgIdQuery({
    variables: { orgId, limit: 20 },
  });

  if (loading || inqLoading) return <LoadingSpinner />;

  if (error || inqError) return <p>{error?.message || inqError?.message}</p>;

  if (data?.getOrgPrivateInfoByIdAndCookie.org && inqData.getInquiriesByOrgId.inquiries) {
    const { avatar, image, orgName, id, inquiries } = data?.getOrgPrivateInfoByIdAndCookie.org;
    const inq = inqData?.getInquiriesByOrgId.inquiries;
    // console.log('inq:', inq);
    // const modifiedInq = inquiries.concat(inq);
    // const descByDay = [...inq].reverse();
    // console.log('descByDay:', descByDay);

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
          inq[0] ? (
            <>
              <TextLabel content="お問い合わせ一覧" />
              <InquiryInfiniteTable orgId={id} initialInquiries={inq} limit={20} />
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

  return <p>{data?.getOrgPrivateInfoByIdAndCookie.error}</p>;
};

export default InquiryBoxPrivatePage;
