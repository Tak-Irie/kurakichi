import { useState } from 'react';
import { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';

import { fetchGraphqlApi } from '../../util/fetchGraphqlApi';
import {
  OrgProfile,
  OrgTemplate,
  ButtonWithIcon,
  IconsMail,
  IconsCaution,
  FeedbackCaution,
  PopOnIcon,
  Disclosure,
  Tabs,
  OrgService,
  OrgArticle,
  TextSmall,
  LoadingSpinner,
} from '../../components/presentational';
import { SendInquiryForm } from '../../components/container';
import { OrgPayload, useGetOrgPublicInfoByIdQuery, useGetUserByCookieQuery } from '../../graphql';

// type OrgProps = InferGetStaticPropsType<typeof getStaticProps>;
const shared = {
  image: 'UNKNOWN',
  description: '都民向けの福祉サービスの相談・受付を行っております',
  avatar: 'UNKNOWN',
  homePage: 'UNKNOWN',
  adminId: '01F4BVK5ZA3NA42HXKAS0EDHC2',
};
const mock = {
  id: '01F5JQA6T3TKY3H12D43VY6066',
  name: '北海道庁',
  location: '060-8588北海道札幌市中央区北三条西6-北海道庁',
  latitude: 43.06439,
  longitude: 141.3468805,
  email: 'hokkaido@example.com',
  phoneNumber: '011-231-4111',
  ...shared,
  description: '道民向けの福祉サービスの相談・受付を行っております',
};

// const OrgProfilePublicPage: NextPage<OrgProps>= (props) => {
const OrgProfilePublicPage: NextPage = () => {
  // console.log('props:', props.data.getOrgPublicInfoById.org);
  const router = useRouter();
  const [openedInqForm, setOpenedInqForm] = useState(false);
  const [shownTab, setShownTab] = useState(0);
  // console.log('router:', router.query);
  // const { data } = useGetOrgPublicInfoByIdQuery({
  //   variables: {
  //     orgId: router.query.id as string,
  //   },
  // });

  const { data: userData, loading, error } = useGetUserByCookieQuery({ fetchPolicy: 'cache-only' });
  // if (router.isFallback) {
  //   return <div>Loading...</div>;
  // }

  if (loading) return <LoadingSpinner />;

  if (error) return <p>{error?.message}</p>;

  // if (data?.getOrgPublicInfoById.org) {
  //   console.log('data:', data);
  const org = mock;

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
      pageTabs={<Tabs labels={['概要', '事業', '記事']} clickHandler={setShownTab} />}
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
// // TODO:need to SSR?, examine it
// export const getStaticPaths: GetStaticPaths = async () => {
//   const data = await fetchGraphqlApi({
//     query: `query _query {
//               getOrgs {
//                 orgs {
//                 id
//               }
//             }
//           }`,
//   });

//   const paths = data.getOrgs.orgs.map((org) => {
//     return { params: { id: org.id } };
//   });

//   return {
//     paths,
//     fallback: true,
//   };
// };

// export const getStaticProps = async ({ params }) => {
//   const data: { getOrgPublicInfoById: OrgPayload } = await fetchGraphqlApi({
//     query: `query _query($orgId: String!) {
//               getOrgPublicInfoById(orgId: $orgId) {
//                 org {
//                   id
//                   orgName
//                   location
//                   latitude
//                   longitude
//                   email
//                   phoneNumber
//                   image
//                   avatar
//                   description
//                   homePage
//                   members {
//                     id
//                     userName
//                     avatar
//                   }
//                   inquiries {
//                     id
//                     content
//                   }
//                 }
//                 error {
//                     message
//                   }
//               }
//             }`,
//     variables: { orgId: params.id },
//   });

//   // console.log('SSG data:', data.getOrg.org.members);
//   return { props: { data } };
// };

export default OrgProfilePublicPage;
