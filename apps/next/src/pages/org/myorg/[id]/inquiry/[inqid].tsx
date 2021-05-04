import { NextPage } from 'next';
import Link from 'next/link';

import {
  OrgTemplate,
  InquiryTree,
  LoadingStylishSpinner,
  ButtonWithIcon,
  IconsUsers,
  IconsMail,
} from '@next/ui';
import {
  useGetOrgPrivateInfoByIdAndCookieQuery,
  useGetInquiriesByTreeIdAndCookieQuery,
} from '@next/graphql';
import { isServer, useGetIdFromUrl } from '../../../../../util';
import { useRouter } from 'next/router';

const InquiryTreePrivatePage: NextPage = () => {
  const router = useRouter();
  // const ids = useGetIdFromUrl();
  // console.log('ids:', ids);
  // console.log('data of router:', router);
  const orgId = router.query.id as string;
  const inqtId = router.query.inqid as string;
  // console.log('data of routerQuery:', router.query);
  // console.log('ids:', qobj.oid);
  // console.log('ids:', qobj.inqtid);
  const { data: oData } = useGetOrgPrivateInfoByIdAndCookieQuery({
    fetchPolicy: 'cache-only',
    // variables: { orgId: qobj.oid as string },
    variables: { orgId },
    skip: isServer(),
    ssr: false,
  });
  const { data, loading, error } = useGetInquiriesByTreeIdAndCookieQuery({
    // variables: { treeId: qobj.inqtid as string },
    variables: { treeId: inqtId },
    skip: isServer(),
    ssr: false,
  });

  // console.log('.org:', orgData.org);
  if (loading) return <LoadingStylishSpinner />;
  if (error) return <p>{error.message}</p>;

  const inqData = data.getInquiriesByTreeIdAndCookie;
  const orgData = oData.getOrgPrivateInfoByIdAndCookie;

  if (inqData.error) {
    return <p>{inqData.error.message}</p>;
  }
  if (!loading && inqData.inquiryTree && orgData.org)
    return (
      <OrgTemplate
        avatar={orgData.org.avatar}
        image={orgData.org.image}
        orgName={orgData.org.orgName}
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
        pageContents={<InquiryTree inquiries={inqData.inquiryTree.treedInquiry} />}
      />
    );
};

export default InquiryTreePrivatePage;
