import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  ButtonWithIcon,
  FeedbackCaution,
  IconsCaution,
  IconsMail,
  LoadingSpinner,
  OrgArticle,
  OrgProfile,
  OrgService,
  OrgTemplate,
  PopOnIcon,
  TextSmall,
} from '../../components/presentational';
import { Disclosure } from '../../components/presentational/molecules';
import {
  useGetOrgPublicInfoByIdQuery,
  useGetUserMyInfoQuery,
} from '../../graphql';

const OrgInfoPage: NextPage = () => {
  const router = useRouter();
  const orgId = router.query.id as string;
  const [openedInqForm, setOpenedInqForm] = useState(false);

  const { data, loading, error } = useGetOrgPublicInfoByIdQuery({
    variables: { orgId },
  });
  const { data: userData } = useGetUserMyInfoQuery({
    fetchPolicy: 'cache-only',
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p>{error?.message}</p>;
  if (data?.getOrg?.__typename === 'Errors')
    return <p>{data.getOrg.applicationError?.message}</p>;

  if (data?.getOrg?.__typename === 'Org') {
    const fetchedOrg = data.getOrg;
    return (
      <OrgTemplate
        avatar={fetchedOrg.avatarUrl || ''}
        image={fetchedOrg.heroImageUrl || ''}
        orgName={fetchedOrg.name || ''}
        headerButtons={
          userData?.getUserByCookie?.__typename === 'User' ? (
            <Disclosure
              label={
                <ButtonWithIcon
                  onClick={() => setOpenedInqForm(!openedInqForm)}
                  type="button"
                  label="お問い合わせ"
                  icon={<IconsMail />}
                />
              }
              contentCSS="absolute z-10 mt-12"
              content={<div>a</div>}
              // <SendInquiryForm orgId={org.id} receiverId={org.members[0].id} />}
            />
          ) : (
            <div className="flex items-center space-x-3">
              <PopOnIcon
                icon={<IconsCaution />}
                content={<FeedbackCaution>ログインが必要です</FeedbackCaution>}
              />
              <ButtonWithIcon
                onClick={() => setOpenedInqForm(!openedInqForm)}
                type="button"
                label="お問い合わせ"
                disabled
                icon={<IconsMail />}
              />
            </div>
          )
        }
        pageTabs={['概要', '事業', '記事']}
        pageContents={[
          <OrgProfile org={fetchedOrg} />,
          <OrgService
            title="事業紹介"
            content={
              <TextSmall
                content={`・取り組んでいる事業を紹介するページです\n・利用者の方が利用しやすい雰囲気を醸成するために活用してください\n\n・※ 編集機能を現在作成中です`}
              />
            }
          />,
          <OrgArticle
            title="記事"
            content={
              <TextSmall
                content={`・日々の活動を紹介するページです\n・利用者の方が利用しやすい雰囲気を醸成するために活用してください\n\n※ 編集機能を現在作成中です`}
              />
            }
          />,
        ]}
      />
    );
  }
  return <p>wip, something wrong</p>;
};

export default OrgInfoPage;
