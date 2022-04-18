import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  ButtonWithIcon,
  Disclosure,
  FeedbackCaution,
  IconsCaution,
  IconsMail,
  LoadingSpinner,
  OrgArticle,
  OrgProfile,
  OrgService,
  OrgTemplate,
  PopOnIcon,
  Tabs,
  TextSmall,
} from '../../components/presentational';

const OrgProfilePublicPage: NextPage = () => {
  const router = useRouter();
  const [openedInqForm, setOpenedInqForm] = useState(false);
  const [shownTab, setShownTab] = useState(0);

  const {
    data: userData,
    loading,
    error,
  } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });

  if (loading) return <LoadingSpinner />;

  if (error) return <p>{error?.message}</p>;

  return (
    <OrgTemplate
      avatar={org.avatar}
      image={org.image}
      orgName={org.name}
      headerButtons={
        userData?.getUserByCookie.user ? (
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
      pageTabs={
        <Tabs labels={['概要', '事業', '記事']} clickHandler={setShownTab} />
      }
      pageContents={
        shownTab === 0 ? (
          <OrgProfile org={org} />
        ) : shownTab === 1 ? (
          <OrgService
            title="事業紹介"
            content={
              <TextSmall
                content={`・取り組んでいる事業を紹介するページです\n・利用者の方が利用しやすい雰囲気を醸成するために活用してください\n\n・※ 編集機能を現在作成中です`}
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
  return <p>loading</p>;
};

export default OrgProfilePublicPage;
