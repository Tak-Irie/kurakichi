import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  ButtonWithIcon,
  IconsCog,
  IconsMail,
  LoadingSpinner,
  OrgArticle,
  OrgMyPage,
  OrgService,
  OrgTemplate,
  Tabs,
  TextSmall,
} from '../../../../components/presentational';
import { useGetOrgPrivateInfoByCookieAndIdQuery } from '../../../../graphql';
import { FAIL_TO_FETCH } from '../../../../util/Constants';

const OrgPrivatePage: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;
  const [shownTab, setShownTab] = useState(0);

  const { data, loading, error } = useGetOrgPrivateInfoByCookieAndIdQuery({
    variables: { orgId },
    fetchPolicy: 'cache-first',
    ssr: false,
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;

  if (data?.getOrgInfoByMemberCookieAndId?.errors?.applicationError)
    return (
      <p>
        {data?.getOrgInfoByMemberCookieAndId?.errors?.applicationError.message}
      </p>
    );

  const _org = data?.getOrgInfoByMemberCookieAndId?.org;
  return (
    <OrgTemplate
      avatar={_org?.avatarUrl || FAIL_TO_FETCH}
      image={_org?.heroImageUrl || FAIL_TO_FETCH}
      orgName={_org?.name || FAIL_TO_FETCH}
      headerButtons={
        <>
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
        </>
      }
      pageTabs={
        <Tabs labels={['概要', '事業', '記事']} clickHandler={setShownTab} />
      }
      pageContents={
        shownTab === 0 && _org ? (
          <OrgMyPage
            org={{
              members: {
                edges: _org.members?.edges,
              },
              ..._org,
            }}
          />
        ) : shownTab === 1 ? (
          <OrgService
            title="事業紹介"
            content={
              <TextSmall
                content={`・取り組んでいる事業を紹介するページです\n・利用者の方が利用しやすい雰囲気を醸成するために活用してください\n\n※ 編集機能を現在作成中です`}
              />
            }
          />
        ) : shownTab === 2 ? (
          <OrgArticle
            title="記事"
            content={
              <TextSmall
                content={`・日々の活動を紹介するページです\n・利用者の方が利用しやすい雰囲気を醸成するために活用してください\n\n※ 編集機能を現在作成中です`}
              />
            }
          />
        ) : (
          <p>error</p>
        )
      }
    />
  );
};

export default OrgPrivatePage;
