import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useGetOrgPrivateInfoByIdAndCookieQuery } from '../../../../graphql/generated/graphql';
import {
  OrgMyPage,
  OrgArticle,
  OrgService,
  TextSmall,
  LoadingSpinner,
  OrgTemplate,
  ButtonWithIcon,
  IconsCog,
  IconsMail,
  Tabs,
} from '../../../../components/presentational';

const OrgPrivatePage: NextPage = () => {
  const router = useRouter();
  const [shownTab, setShownTab] = useState(0);

  const { data, loading, error } = useGetOrgPrivateInfoByIdAndCookieQuery({
    variables: { orgId: router.query.id as string },
  });

  if (loading) return <LoadingSpinner />;

  if (error) return <p>{error.message}</p>;

  if (data?.getOrgPrivateInfoByIdAndCookie.error)
    return <p>{data?.getOrgPrivateInfoByIdAndCookie.error.message}</p>;

  const { avatar, image, orgName, id } = data?.getOrgPrivateInfoByIdAndCookie.org;
  return (
    <OrgTemplate
      avatar={avatar}
      image={image}
      orgName={orgName}
      headerButtons={
        <>
          <Link href="/org/myorg/[id]/setting" as={`/org/myorg/${id}/setting`} passHref>
            <a href="replace">
              <ButtonWithIcon type="button" label="団体情報設定" icon={<IconsCog />} />
            </a>
          </Link>
          <Link href="/org/myorg/[id]/inquiry" as={`/org/myorg/${id}/inquiry`} passHref>
            <a href="replace">
              <ButtonWithIcon type="button" label="お問い合わせボックス" icon={<IconsMail />} />
            </a>
          </Link>
        </>
      }
      pageTabs={<Tabs labels={['概要', '事業', '記事']} clickHandler={setShownTab} />}
      pageContents={
        shownTab === 0 ? (
          <OrgMyPage org={data.getOrgPrivateInfoByIdAndCookie.org} />
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
