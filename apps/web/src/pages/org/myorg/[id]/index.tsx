import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  ButtonWithIcon,
  IconsCog,
  IconsMail,
  LoadingSpinner,
  OrgArticle,
  OrgMyPage,
  OrgService,
  OrgTemplate,
  TextSmall,
} from '../../../../components/presentational';
import { useGetOrgPrivateInfoByCookieAndIdQuery } from '../../../../graphql';
import { FAIL_TO_FETCH } from '../../../../lib/Constants';

const OrgPrivatePage: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;

  const { data, loading, error } = useGetOrgPrivateInfoByCookieAndIdQuery({
    variables: { orgId },
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getOrgInfoByMemberCookieAndId?.__typename === 'Errors')
    return (
      <p>{data?.getOrgInfoByMemberCookieAndId?.applicationError?.message}</p>
    );

  if (data?.getOrgInfoByMemberCookieAndId?.__typename === 'Org') {
    const fetchedOrg = data?.getOrgInfoByMemberCookieAndId;
    return (
      <OrgTemplate
        avatar={fetchedOrg?.avatarUrl || FAIL_TO_FETCH}
        image={fetchedOrg?.heroImageUrl || FAIL_TO_FETCH}
        orgName={fetchedOrg?.name || FAIL_TO_FETCH}
        headerButtons={
          <div>
            <Link
              href="/org/myorg/[id]/setting"
              as={`/org/myorg/${orgId}/setting`}
              passHref
            >
              <a href="replace">
                <ButtonWithIcon
                  type="button"
                  label="団体情報設定"
                  icon={<IconsCog />}
                />
              </a>
            </Link>
            <Link
              href="/org/myorg/[id]/inquiry"
              as={`/org/myorg/${orgId}/inquiry`}
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
          </div>
        }
        pageTabs={['概要', '事業', '記事']}
        pageContents={[
          {
            id: 'info',
            content: (
              <OrgMyPage
                org={{
                  members: {
                    edges: fetchedOrg.members?.edges,
                  },
                  ...fetchedOrg,
                }}
              />
            ),
          },
          {
            id: 'service',
            content: (
              <OrgService
                title="事業紹介"
                content={
                  <TextSmall
                    content={`・取り組んでいる事業を紹介するページです\n・利用者の方が利用しやすい雰囲気を醸成するために活用してください\n\n※ 編集機能を現在作成中です`}
                  />
                }
              />
            ),
          },
          {
            id: 'article',
            content: (
              <OrgArticle
                title="記事"
                content={
                  <TextSmall
                    content={`・日々の活動を紹介するページです\n・利用者の方が利用しやすい雰囲気を醸成するために活用してください\n\n※ 編集機能を現在作成中です`}
                  />
                }
              />
            ),
          },
        ]}
      />
    );
  }

  return <p>wip, something wrong</p>;
};
export default OrgPrivatePage;
